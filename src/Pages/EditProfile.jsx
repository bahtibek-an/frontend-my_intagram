import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updatePassword, updateProfile } from "firebase/auth";
import { db } from "../Database/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(currentUser, { displayName });

      if (password) {
        await updatePassword(currentUser, password);
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { displayName }, { merge: true });

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
      <div className="bg-white d-flex ">
        <div className='p-0 position-relative col-md-3'>
          <Sidebar />
        </div>
        <div className="p-0 col-md-6 mt-5 bg-white overflow-auto none-scroll">
          <div className="container-fluid p-5 d-flex ">
            <div className="card p-5 w-75 shadow">
              <h2>Update Profile</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleUpdateProfile} className="w-100">
                <div className="mb-3">
                  <label htmlFor="displayName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary float-end">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;