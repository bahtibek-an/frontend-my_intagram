import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
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
import Navbar from "../components/Navbar";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import Posts from "../components/Posts";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      collection(firestore, "images"),
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

    if (imageFile && comment) {
      try {
        const storageRef = ref(storage, `images/${imageFile.name}`);
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

            await addDoc(collection(firestore, "images"), {
              imageUrl: downloadURL,
              comment: comment,
              userId: currentUser.uid,
              userName: currentUser.displayName,
              like: 0,
              timestamp: serverTimestamp(),
            });

            setImageFile(null);
            setComment("");
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="body">
      <Navbar />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ marginTop: 300 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create Post
              </h1>
              <button type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    class="form-control mb-3" id="inputGroupFile02"
                  />
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Enter a comment"
                    class="form-control mb-3" id="exampleFormControlTextarea1" rows="3"
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div className="p-5 col-md-8">
          {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
        </div>

        <div className="p-5 col-md-4 mobile-none">
          <div className="d-flex">
            <img
              src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
              alt=""
              width="60px"
              className="float"
            />
            <h6 className="m-5 mt-0 mb-0 d-flex justify-content-center align-items-center">
              {currentUser.displayName}
            </h6>
          </div>
          <br />
          All Users
          <br />
          <hr />
          <div className="d-flex mb-1">
            <img
              src='https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg'
              alt=""
              width="60px"
              className="float"
            />
            <h6 className="m-5 mt-0 mb-0 d-flex justify-content-center align-items-center">
              Accaunt
            </h6>
          </div>
          <hr />
          <div className="d-flex mb-1">
            <img
              src='https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg'
              alt=""
              width="60px"
              className="float"
            />
            <h6 className="m-5 mt-0 mb-0 d-flex justify-content-center align-items-center">
              Exsample
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
