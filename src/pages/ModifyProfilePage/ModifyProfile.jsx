import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Sidebar from "../SidebarComponent/Sidebar";
import ModifyProfileForm from "./ModifyProfileForm";
import { Box } from "@chakra-ui/react";

import { auth, db, storage } from "../../firebase/firebase";

export default function ProfileEditor() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [newDisplayName, setNewDisplayName] = useState(
    currentUser.displayName || ""
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const user = auth.currentUser;

      if (selectedImage) {
        const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(user, { photoURL: downloadURL });

        const userDocRef = doc(db, "Users", currentUser.uid);
        await updateDoc(userDocRef, { photoURL: downloadURL });

        setCurrentUser({
          ...currentUser,
          photoURL: downloadURL,
        });
      }

      if (newDisplayName !== currentUser.displayName) {
        await updateProfile(user, { displayName: newDisplayName });
        const userDocRef = doc(db, "Users", currentUser.uid);
        await updateDoc(userDocRef, {
          displayName: newDisplayName,
        });
        setCurrentUser({
          ...currentUser,
          displayName: newDisplayName,
        });
      }

      navigate(`/${currentUser.uid}`);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Box>
      <Sidebar />
      <ModifyProfileForm
        newName={newDisplayName}
        setNewName={setNewDisplayName}
        savingChanges={saving}
        handleImageChange={handleFileChange}
        applyUserChanges={handleUpdateProfile}
        selectedImage={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : currentUser.photoURL
        }
      />
    </Box>
  );
}
