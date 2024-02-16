import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImage from "../hooks/usePreviewImage";
import useShowToast from "../hooks/useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImage();
  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();
  // eslint-disable-next-line
  const { pathname } = useLocation();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedFile("");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center items-center gap-4 p-2 rounded-lg transition-colors hover:bg-white bg-opacity-40"
          onClick={() => setIsOpen(true)}
        >
         <AiOutlinePlusCircle className="flex items-center" size={30} /> 
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white border-gray-700 rounded w-64">
              <div className="p-4">
                <h2 className="text-gray-900 text-lg font-semibold mb-4">Create Post</h2>
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <textarea
                  className="resize-none border rounded p-2 mb-4 w-full"
                  placeholder="Write caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={handleImageChange}
                />
                <BsFillImageFill
                  onClick={() => imageRef.current.click()}
                  className="mt-1 ml-1 cursor-pointer"
                  size={16}
                />
                {selectedFile && (
                  <div className="mt-5 w-full relative flex justify-center">
                    <img src={selectedFile} alt="Your picture" className="w-full" />
                    <button
                      className="absolute top-2 right-2 text-white"
                      onClick={() => setSelectedFile("")}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4">
                <button
                  className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded mr-3 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
                  onClick={handlePostCreation}
                  disabled={isLoading}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image!");
    setIsLoading(true);
    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageUrl: downloadUrl });

      newPost.imageUrl = downloadUrl;
      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreatePost };
}
