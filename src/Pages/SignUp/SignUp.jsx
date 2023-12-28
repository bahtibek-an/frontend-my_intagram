// Signup.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  db,
  storage,
} from "../../context/Firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import InstaImage from "../../Images/photo_2023-11-28_21-56-20.jpg";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const googleUserInfo = res.user;
  
      const date = new Date().getTime();
      const storageRef = ref(storage, `${googleUserInfo.displayName + date}`);
  
      let photoURL =
        "https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg";
  
      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }
  
      await updateProfile(googleUserInfo, {
        displayName: res._tokenResponse.firstName,
        photoURL: googleUserInfo.photoURL,
      });
  
      await setDoc(doc(db, "users", googleUserInfo.uid), {
        uid: googleUserInfo.uid,
        displayName: res._tokenResponse.firstName,
        email: googleUserInfo.email,
        photoURL: googleUserInfo.photoURL,
      });
  
      await setDoc(doc(db, "User_uid", googleUserInfo.uid), {});
      navigate("/");
    } catch (error) {
      setError("Google Sign-In Error: " + error.message);
    }
  };
  
  

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const facebookUserInfo = await signInWithPopup(auth, provider);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${facebookUserInfo.user.displayName + date}`);

      let photoURL = "https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg";

      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }

      await updateProfile(facebookUserInfo.user, {
        displayName: facebookUserInfo.user.displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", facebookUserInfo.user.uid), {
        uid: facebookUserInfo.user.uid,
        displayName: facebookUserInfo.user.displayName,
        email: facebookUserInfo.user.email,
        photoURL,
      });


      await setDoc(doc(db, "User_uid", facebookUserInfo.user.uid), {});
      navigate("/");
    } catch (error) {
      setError("Facebook Sign-In Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      let photoURL = "https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg";

      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }

      await updateProfile(res.user, {
        displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL,
      });

      await setDoc(doc(db, "User_uid", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setError("Sign-Up Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadAndGetDownloadURL = (storageRef, file) => {
    return new Promise((resolve, reject) => {
      uploadBytesResumable(storageRef, file)
        .then(() => getDownloadURL(storageRef))
        .then((downloadURL) => resolve(downloadURL))
        .catch((error) => reject("Image Upload Error: " + error.message));
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("image")) {
      setFile(selectedFile);
    } else {
      setError("Invalid file type. Please select an image file.");
    }
  };

  return (
    <>
      <div className="sign-up">
        <div className="container-up">
          <div className="image-up">
            <img src={InstaImage} alt="" className="img-up" />
          </div>
          <div className="form-div-up">
            <div className="form-up">
              <form className="form" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <div className="sign-up-input">
                  <input type="text" className="input-up" placeholder="Username" required />
                </div>
                <div className="sign-up-input">
                  <input type="email" className="input-up" placeholder="Email address" required />
                </div>
                <div className="sign-up-input">
                  <input type="password" className="input-up" placeholder="Password" required />
                </div>

                <div className="sign-up-input">
                <input className="input-up" type="file" onChange={handleFileChange} accept="image/*" required/>

                </div>
                <button className="sign-up-button" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Sign up"}
                </button>
                <h5 className="">
                  <center>--- --- OR --- ---</center>
                </h5>
              </form>
              <div className="form-element">
                <button onClick={handleGoogleSignIn} className="sign-up-google">
                  Google
                </button>
                <button onClick={handleFacebookSignIn} className="sign-up-facebook">
                  Facebook
                </button>
                <div className="">
                  <p className="sign-up-sign-in-text">
                    Already have an account? <Link className="sign-up-sign-in-link" to="/sign-in">Sign In</Link>
                  </p>
                </div>
                {error && (
                  <div className="error-text-up">
                    <h6>{error}</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
