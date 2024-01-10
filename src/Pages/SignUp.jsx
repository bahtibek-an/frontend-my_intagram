import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  db,
  storage,
} from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const uploadAndGetDownloadURL = async (storageRef, file) => {
    try {
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      throw new Error("Image Upload Error: " + error.message);
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
      let photoURL = "https://assets.bananastreet.ru/unsafe/2498x2498/https://bananastreet.ru/system/user/avatar/38/382/382231/7e7ab91539.png";

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
      setError("There is such a user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <section>
        {Array.from({ length: 260 }, (_, index) => <span key={index}></span>)}

        <div className="signin">
          <div className="content">
            <h2>Register</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputBox">
                <input type="text" required /> <i>Username</i>
              </div>
              <div className="inputBox">
                <input type="text" required /> <i>Mail</i>
              </div>
              <div className="inputBox">
                <input type="password" required /> <i>Password</i>
              </div>
              <div className="links">
                <Link to="/login">Login</Link>
              </div>
              <div className="inputBox">
                <input
                  type="submit"
                  value={loading ? "Loading..." : "Register"}
                  disabled={loading}
                  style={loading ? { opacity: "0.6", cursor: "not-allowed" } : {}}
                />
              </div>
              {error && (
                <div className="err-text">
                  <center>
                    <h5>{error}</h5>
                  </center>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
