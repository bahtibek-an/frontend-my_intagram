import React, { useContext, useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { db } from "../Datebase/Datebase";
import { AuthContext } from "../Datebase/Auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [newDisplayname, setNewDisplayname] = useState(currentUser.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setSaving(true)

    try {
      const auth = getAuth();

      if (email !== currentUser.email) {
        await updateEmail(auth.currentUser, email);
        await sendEmailVerification(auth.currentUser);
        console.log("Email verification sent.");
      }

      if (newPassword !== "") {
        try {
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentPassword
          );
          await reauthenticateWithCredential(auth.currentUser, credential);
          await updatePassword(auth.currentUser, newPassword);
        } catch (reauthError) {
          return;
        }
      }

      if (selectedImage) {
        try {
          const storage = getStorage();
          const userDocRef = doc(db, "Users", currentUser.uid);
          const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
          await uploadBytes(storageRef, selectedImage);
          const downloadURL = await getDownloadURL(storageRef);
          await updateProfile(auth.currentUser, { photoURL: downloadURL });
          await updateDoc(userDocRef, {
            photoURL: downloadURL
          });
        } catch (uploadError) {
          console.error("Error uploading profile picture:", uploadError.message);
          return;
        }
      }

      if (newDisplayname !== currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: newDisplayname });
        const userDocRef = doc(db, "Users", currentUser.uid);
        await updateDoc(userDocRef, {
          displayName: newDisplayname,
          email: email,
        });
      }

      navigate(`/profile`);
    } catch (err) {}
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white">
        <div className="w-full p-8 mx-auto my-4 rounded-md">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Edit Profile</h1>
            <button
              onClick={handleUpdateProfile}
              className="p-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : currentUser.photoURL}
              alt={`${currentUser.displayName} avatar`}
              className="w-24 h-24 mr-4 rounded-full"
            />
            <div>
              <label htmlFor="avatar" className="text-blue-500 cursor-pointer hover:underline">
                Change Profile Photo
              </label>
              <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-1 border rounded"
              value={newDisplayname}
              onChange={(e) => setNewDisplayname(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">
              Old password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full p-2 mt-1 border rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
              New password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 mt-1 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
