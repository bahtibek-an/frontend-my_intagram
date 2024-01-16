import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import Post from "./Post";
import { Navigate } from "react-router-dom";

const UploadPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  const firestore = getFirestore();
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      collection(firestore, "posts"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      }
    );

    const usersQuery = query(
      collection(firestore, "users"),
      orderBy("createdAt"),
      limit(10)
    );

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFile) {
      try {
        const storageRef = ref(storage, `posts/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(firestore, "posts"), {
              imageUrl: downloadURL,
              comment: comment,
              userId: currentUser.uid,
              userName: currentUser.displayName,
              like: 0,
              timestamp: serverTimestamp(),
            });
            setSuccess(true);

            window.location.reload(false);
          }


        );



      } catch (error) {
        console.error(error);
      }

    }
  };

  return (
    <div className="bg-white">
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control mb-3" id="inputGroupFile02"
                />
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Enter a comment"
                  className="form-control mb-3" id="exampleFormControlTextarea1" rows="3"
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  {success ? "Upload successful" : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        {posts.map((post) => (
          <Post key={post.id} post={post} currentUserID={currentUser.uid} />
        ))}
      </div>


    </div>
  );
};

export default UploadPost;
