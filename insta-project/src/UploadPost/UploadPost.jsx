import React, { useContext, useState } from 'react';
import { AuthContext } from '../Datebase/Auth';
import { CameraIcon, EmojiHappyIcon } from "@heroicons/react/solid";
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "@firebase/firestore";
import Sidebar from '../Sidebar/Sidebar';

const UploadPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const storage = getStorage();
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (imageFile) {
      try {
        const storageRef = ref(storage, `posts/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(firestore, "Posts"), {
              imageUrl: downloadURL,
              caption: comment,
              userUID: currentUser.uid,
              username: currentUser.displayName,
              avatarUrl: currentUser.photoURL,
              likes: 0,
              timestamp: serverTimestamp(),
            });

            setImageFile(null);
            setComment("");
            navigate("/");
          }
        );
      } catch (error) {
        console.error("Error during post creation:", error);
      }
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="mx-auto my-4 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg w-96">
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <span className="text-xl font-semibold">Create a Post</span>
              </div>

              <div className="p-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-between p-4 border-t border-gray-300">
                <label className="text-blue-500 cursor-pointer">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <CameraIcon className="w-6 h-6" /> Upload Photo
                </label>
              </div>

              <div className="flex items-center justify-end p-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPost;
