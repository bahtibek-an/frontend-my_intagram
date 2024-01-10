import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
      }

      const updateData = { displayName };

      await updateProfile(currentUser, updateData);

      await updateDoc(doc(db, "users", currentUser.uid), updateData);

      navigate(`/profile/${currentUser.uid}`);
    } catch (err) {
      console.error(err);
      setError("Error updating profile. Please check your current password.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Edit Profile</h6>
                      <div className="m-b-25">
                        <img src={currentUser.photoURL} className="img-radius" alt="user" />
                      </div>
                      <h6 className="f-w-600">{displayName}</h6>
                      <p>{currentUser.email}</p>
                      <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <div className="row">
                        <form onSubmit={handleUpdateProfile}>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Display Name</p>
                            <h6 className="text-muted f-w-400">
                              <input
                                type="text"
                                className="comment-box edit"
                                placeholder={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                              />
                            </h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-7 f-w-600">Current Password</p>
                            <p className="m-b-5 f-w-150" style={{ color: 'blue'}}>Type current password for update profile</p>
                            <h6 className="text-muted f-w-400">
                              <input
                                type="password"
                                className="comment-box edit"
                                placeholder="Current Password"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                              />
                            </h6>
                          </div>
                           {error && (
                            <div className="col-12">
                              <p className="error-message" style={{ color: 'blue'}}>{error}</p>
                            </div>
                          )}
                          <button type="submit" className="btn update-btn profile-edit-btn">
                            Update Profile
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
