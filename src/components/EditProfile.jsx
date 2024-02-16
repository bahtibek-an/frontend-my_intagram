// import { Link } from "react-router-dom";
// import { useState, useRef } from "react";
// import useAuthStore from "../store/authStore";
// import usePreviewImage from "../hooks/usePreviewImage";
// import useEditProfile from "../hooks/useEditProfile";
// import useShowToast from "../hooks/useShowToast";

// const EditProfile = () => {
//   const [inputs, setInputs] = useState({
//     fullname: "",
//     username: "",
//     bio: "",
//   });

//   const authUser = useAuthStore((state) => state.user);
//   // eslint-disable-next-line
//   const fileRef = useRef(null);
//   // eslint-disable-next-line
//   const { selectedFile, handleImageChange, setSelectedFile } =
//     usePreviewImage();
//   const { editProfile, isUpdating } = useEditProfile();
//   const showToast = useShowToast();

//   const handleEdit = async () => {
//     try {
//       await editProfile(inputs, selectedFile);
//       setSelectedFile(null);
//     } catch (error) {
//       showToast("Error", error.message, "error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="border border-gray-300 items-center bg-white p-6 rounded-lg">
//         <h1 className="text-4xl font-bold mb-6 ">Edit Profile</h1>
//         <div className="flex justify-center mb-6">
//           <img
//             className="w-32 h-32 rounded-full border-2 border-white"
//             src={selectedFile || authUser.profilePicUrl}
//             alt="Profile"
//           />
//         </div>
//         <div className="flex flex-col sm:flex-row gap-6">
//         <div className="flex justify-center">
//           <img
//             src={selectedFile || authUser.profilePicUrl}
//             alt="Profile"
//             className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-white"
//           />
//         </div>
//         <div className="flex flex-col justify-center w-full">
//           <button
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             onClick={() => fileRef.current.click()}
//           >
//             Edit Profile Picture
//           </button>
//         </div>
//         <input
//           type="file"
//           hidden
//           ref={fileRef}
//           onChange={handleImageChange}
//         />
//       </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="fullname">Full Name</label>
//           <input
//             id="fullname"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Full Name"
//             value={inputs.fullname || authUser.fullname}
//             onChange={(e) =>
//               setInputs({ ...inputs, fullname: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="username">Username</label>
//           <input
//             id="username"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Username"
//             value={inputs.username || authUser.username}
//             onChange={(e) =>
//               setInputs({ ...inputs, username: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="bio">Bio</label>
//           <input
//             id="bio"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Bio"
//             value={inputs.bio || authUser.bio}
//             onChange={(e) =>
//               setInputs({ ...inputs, bio: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <Link to="/" className="flex justify-between">
//             <button className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-red-600">
//               Cancel
//             </button>

//             <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-500"
//             onClick={handleEdit}
//             disabled={isUpdating}
//           >
//             {isUpdating ? "Updating..." : "Submit"}
//           </button>
//           </Link>
       
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



// import { Link } from "react-router-dom";
// import { useState, useRef } from "react";
// import useAuthStore from "../store/authStore";
// import usePreviewImage from "../hooks/usePreviewImage";
// import useEditProfile from "../hooks/useEditProfile";
// import useShowToast from "../hooks/useShowToast";

// const EditProfile = () => {
//   const [inputs, setInputs] = useState({
//     fullname: "",
//     username: "",
//     bio: "",
//   });

//   const authUser = useAuthStore((state) => state.user);
//   const fileRef = useRef(null);
//   const { selectedFile, handleImageChange, setSelectedFile } =
//     usePreviewImage();
//   const { editProfile, isUpdating } = useEditProfile();
//   const showToast = useShowToast();

//   const handleEdit = async () => {
//     try {
//       await editProfile(inputs, selectedFile);
//       setSelectedFile(null);
//     } catch (error) {
//       showToast("Error", error.message, "error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="border border-gray-300 items-center bg-white p-6 rounded-lg">
//         <h1 className="text-4xl font-bold mb-6">Edit Profile</h1>
//         <div className="flex justify-center mb-6">
//           <label htmlFor="profilePicture" className="cursor-pointer">
//             <img
//               src={selectedFile || authUser.profilePicUrl}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-2 border-white"
//             />
//             <input
//               id="profilePicture"
//               type="file"
//               hidden
//               ref={fileRef}
//               onChange={handleImageChange}
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="fullname">Full Name</label>
//           <input
//             id="fullname"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Full Name"
//             value={inputs.fullname || authUser.fullname}
//             onChange={(e) =>
//               setInputs({ ...inputs, fullname: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="username">Username</label>
//           <input
//             id="username"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Username"
//             value={inputs.username || authUser.username}
//             onChange={(e) =>
//               setInputs({ ...inputs, username: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm" htmlFor="bio">Bio</label>
//           <input
//             id="bio"
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
//             type="text"
//             placeholder="Bio"
//             value={inputs.bio || authUser.bio}
//             onChange={(e) =>
//               setInputs({ ...inputs, bio: e.target.value })
//             }
//           />
//         </div>
//         <div className="flex justify-between">
//           <Link to="/">
//             <button className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-red-600">
//               Cancel
//             </button>
//           </Link>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-500"
//             onClick={handleEdit}
//             disabled={isUpdating}
//           >
//             {isUpdating ? "Updating..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import useAuthStore from "../store/authStore";
import usePreviewImage from "../hooks/usePreviewImage";
import useEditProfile from "../hooks/useEditProfile";
import useShowToast from "../hooks/useShowToast";

const EditProfile = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    bio: "",
  });

  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const { editProfile, isUpdating } = useEditProfile();
  const showToast = useShowToast();

  const handleEdit = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-700 items-center bg-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 flex justify-center">Edit Profile</h1>
        <div htmlFor="profilePicture" className="flex justify-center mb-6">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <img
              src={selectedFile || authUser.profilePicUrl}
              className="flex justify-center items-center w-32 h-32 rounded-full border-2 border-white bg-gray-400"
            />
            <br></br>
            <div>
              <input
                  htmlFor="profilePicture"
                  id="profilePicture"
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              <button htmlFor="profilePicture" 
              onClick={() => fileRef.current.click()} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-400">
              
              Change Profile Picture
              </button>
            </div>
          </label>
        </div>
        <div className="mb-4">
          <label className="text-sm" alt="Full Name">Full Name</label>
          <input
            id="fullname"
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
            type="text"
            placeholder="Full Name"
            value={inputs.fullname}
            onChange={(e) =>
              setInputs({ ...inputs, fullname: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-sm" htmlFor="username">Username</label>
          <input
            id="username"
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
            type="text"
            placeholder="Username"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, username: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-sm" htmlFor="bio">Bio</label>
          <input
            id="bio"
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
            type="text"
            placeholder="Bio"
            value={inputs.bio}
            onChange={(e) =>
              setInputs({ ...inputs, bio: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between">
         <Link to="/">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-red-400">
              Exit
            </button>
         </Link>
         <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-400"
            onClick={handleEdit}
          >
            <Link to="/">
              Submit
          </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;