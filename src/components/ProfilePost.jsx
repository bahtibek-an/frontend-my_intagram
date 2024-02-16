// import { FaRegHeart } from "react-icons/fa";
// import { FaCommentDots } from "react-icons/fa";
// import Comment from "./Comment";
// import PostFooter from "./PostFooter";
// import useUserProfileStore from "../store/userProfileStore";
// import useAuthStore from "../store/authStore";
// import useShowToast from "../hooks/useShowToast";
// import { useState } from "react";
// import { deleteObject, ref } from "firebase/storage";
// import { firestore, storage } from "../firebase/firebase";
// import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import usePostStore from "../store/postStore";
// import Caption from "./Caption";
// import { Img } from "@chakra-ui/react";

// // eslint-disable-next-line
// const ProfilePost = ({ post }) => {
//   const { isOpen, onOpen, onClose } = '';
//   const userProfile = useUserProfileStore((state) => state.userProfile);
//   const authUser = useAuthStore((state) => state.user);
//   const showToast = useShowToast();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const deletePostFromDB = usePostStore((state) => state.deletePost);
//   const deletePostFromUI = useUserProfileStore((state) => state.deletePost);

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this post ?")) return;
//     if (isDeleting) return;
//     try {
//       // eslint-disable-next-line
//       const imageRef = ref(storage, `posts/${post.id}`);
//       await deleteObject(imageRef);
//       const userRef = doc(firestore, "users", authUser.uid);
//       // eslint-disable-next-line
//       await deleteDoc(doc(firestore, "posts", post.id));
//       // eslint-disable-next-line
//       await updateDoc(userRef, { posts: arrayRemove(post.id) });

//       // eslint-disable-next-line
//       deletePostFromDB(post.id);
//       // eslint-disable-next-line
//       deletePostFromUI(post.id);
//       showToast("Success", "Post deleted", "success");
//     } catch (error) {
//       showToast("Error", error.message, "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   };


//   return (
//     <>
//       <div className="cursor-pointer rounded-lg overflow-hidden border border-white-300 relative aspect-w-1 aspect-h-1" onClick={onOpen}>
//         <div className="opacity-0 hover:opacity-1 absolute top-0 left-0 right-0 bottom-0 bg-black-700 transition-all duration-300 ease-in-out z-10 flex justify-center">
//           <div className="flex items-center justify-center space-x-5">
//             <div className="flex items-center">
//               <FaRegHeart size={20} />
//               {/* eslint-disable-next-line */}
//               <span className="font-bold ml-2">{post.likes.length}</span>
//             </div>
//             <div className="flex items-center">
//               <FaCommentDots size={20} />
//               {/* eslint-disable-next-line */}
//               <span className="font-bold ml-2">{post.comments.length}</span>
//             </div>
//           </div>
//         </div>
//         {/* eslint-disable-next-line */}
//         <img src={post.imageUrl} alt="profile img" className="w-full h-full object-cover" />
//       </div>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}></div>
//           <div className="bg-black relative z-10">
//             <button className="absolute top-4 right-4" onClick={onClose}>Close</button>
//             <div className="grid grid-cols-2 gap-10 max-h-screen overflow-y-auto">
//               <div className="rounded-lg overflow-hidden border border-white-300 flex justify-center items-center aspect-w-16 aspect-h-9">
//               {/* eslint-disable-next-line */}
//                 <img src={post.imageUrl} alt="post" />
//               </div>
//               <div className="flex flex-col px-10">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-4">
//                     <img src={userProfile.profilePicUrl} alt="profile" className="w-8 h-8 rounded-full" />
//                     <span className="font-bold text-sm">{userProfile.username}</span>
//                   </div>
//                   {authUser?.uid === userProfile.uid && (
//                     <button className="bg-transparent hover:bg-white-300 hover:text-red-700 text-sm rounded-md p-1" onClick={handleDelete}>Delete</button>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                 {/* eslint-disable-next-line */}
//                   {post.caption && <Caption post={post} />}
//                   {/* eslint-disable-next-line */}
//                   {post.comments.map((comment) => (
//                     <Comment key={comment.id} comment={comment} />
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <PostFooter isProfilePage={true} post={post} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfilePost;


import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Comment from "./Comment";
import PostFooter from "./PostFooter";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/postStore";
import Caption from "./Caption";

const ProfilePost = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePostFromDB = usePostStore((state) => state.deletePost);
  const deletePostFromUI = useUserProfileStore((state) => state.deletePost);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post ?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      deletePostFromDB(post.id);
      deletePostFromUI(post.id);
      showToast("Success", "Post deleted!", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        className="cursor-pointer rounded overflow-hidden border border-whiteAlpha-300 relative aspect-w-1 aspect-h-1"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-blackAlpha-700 transition-all duration-300 ease-in-out opacity-0 hover:opacity-1 flex justify-center items-center">
          <div className="flex gap-50 items-center justify-center">
            <div className="flex">
              <FaRegHeart size={20} />
              <span className="font-bold ml-2">{post.likes.length}</span>
            </div>
            <div className="flex">
              <FaCommentDots size={20} />
              <span className="font-bold ml-2">{post.comments.length}</span>
            </div>
          </div>
        </div>
        <img
          src={post.imageUrl}
          alt="profile img"
          className="w-full h-full object-cover"
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white border rounded">
            <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
              <AiOutlineClose size={20} className="cursor-pointer" />
            </button>
            <div className="flex gap-4 w-90 sm:w-70 md:w-full mx-auto max-h-90vh min-h-50vh">
              <div className=" flex rounded overflow-hidden border border-white-300 w-64 flex justify-center items-center">
                <img src={post.imageUrl} alt="post" />
              </div>
              <div className="flex flex-col bg-white px-10 md:flex">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={userProfile.profilePicUrl}
                      alt="User profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-sm">
                      {userProfile.username}
                    </span>
                  </div>
                  {authUser?.uid === userProfile.uid && (
                    <button
                      className="bg-red-400 hover:bg-red-300 text-white-700 border rounded p-1"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                    Delete
                      {/* <IoTrashBinOutline size={20} className="cursor-pointer" /> */}
                    </button>
                  )}
                </div>
                <hr className="my-4 bg-gray-500" />
                <div className="w-full max-h-350px overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #d1d5db', maxHeight: '200px' }}>
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
                {/* <hr className="my-4 bg-gray-500" /> */}
                <PostFooter isProfilePage={true} post={post} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePost;
