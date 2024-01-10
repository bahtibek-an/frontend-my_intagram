import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../Database/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;

      // Create a user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Set up storage reference
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      
      // Set default photoURL
      let photoURL = "http://www.newdesignfile.com/postpic/2014/09/windows-user-icons-transparent_248595.jpg";

      // Check if file is selected, upload, and get download URL
      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }

      // Update user profile with displayName and photoURL
      await updateProfile(res.user, {
        displayName,
        photoURL,
      });

      // Set user data in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        password,
        photoURL,
      });

      // Set additional data in Firestore
      await setDoc(doc(db, "INSTAuser", res.user.uid), {});

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const uploadAndGetDownloadURL = async (storageRef, file) => {
    try {
      // Upload file to storage
      await uploadBytesResumable(storageRef, file);
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-white text-center body">
      <main className="form-signin card">
        <form onSubmit={handleSubmit}>
          <svg
            aria-label="Instagram"
            className="_ab6- mb-4"
            color="rgb(0, 0, 0)"
            fill="rgb(245, 245, 245)"
            height="49"
            role="img"
            viewBox="32 4 113 32"
            width="123"
          >
            {/* Your SVG path here */}
          </svg>
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>

          {/* Username Input */}
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingUsername" placeholder="Username" required />
            <label htmlFor="floatingUsername">Username</label>
          </div>

          {/* Email Input */}
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          {/* Password Input */}
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* File Input for Photo */}
          <div className="form-group mt-3">
            <label htmlFor="photoInput" className="form-label">Choose Profile Photo</label>
            <input type="file" className="form-control" id="photoInput" onChange={handleFileChange} accept="image/*" />
          </div>

          {/* Submit Button */}
          <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>

          {/* Login Link */}
          <div className="m-2 text-center">
            <p>
              Do you have an account? <Link className="w3-text-blue" to="/login">Enter</Link>
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert-danger alert text-center mt-4">
              <h6>Filled incorrectly!</h6>
            </div>
          )}

          {/* Footer */}
          <p className="mt-3 mb-3 text-muted">&copy; 2023</p>
        </form>
      </main>
    </div>
  );
};

export default Register;
