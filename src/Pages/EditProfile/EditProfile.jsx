import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { db, storage } from "../../context/Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./EditProfile.css";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const updateData = { displayName };

      if (password) {
        updateData.password = password;
      }

      if (profileImage) {
        const storageRef = ref(storage, `profile-images/${currentUser.uid}`);
        await uploadBytes(storageRef, profileImage);
        const downloadURL = await getDownloadURL(storageRef);
        updateData.photoURL = downloadURL;
      }

      await updateProfile(currentUser, updateData);

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, updateData);

      setSuccess("Profile updated successfully!");
      setError(null);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="home">
        <div className="sidebar-home">
          <Sidebar />
        </div>
        <div className="editProfileContainer">
          <div className="cardContainer">
            {error && <div className="alertDanger">{error}</div>}
            {success && <div className="alertSuccess">{success}</div>}
            <form onSubmit={handleUpdateProfile} className="formCard">
              <h3>Edit Profile</h3>
              <br />
              <div className="formGroup">
                <label htmlFor="displayName">New Username</label>
                <input
                  type="text"
                  className="formControl"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="formControl"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  className="formControl"
                  id="profileImage"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
