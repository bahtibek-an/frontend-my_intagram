import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../context/Firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import "./SignIn.css";
import InstaImage from "../../Images/photo_2023-11-28_21-56-20.jpg";

const Signin = () => {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [error, setError] = useState(null); // Renamed 'err' to 'error' for clarity
  const navigate = useNavigate();

  const handleSubmit = async (e, provider) => {
    e.preventDefault();

    try {
      if (provider === 'email') {
        const email = e.target[0].value;
        const password = e.target[1].value;
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } else {
        const result = await signInWithPopup(auth, provider === 'google' ? googleProvider : facebookProvider);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      navigate("/sign-in");
    }
  };

  return (
    <>
      <div className="sign-in">
        <div className="container-in">
          <div className="image-in">
            <img src={InstaImage} alt="" className="img-in" />
          </div>

          <div className="form-div-in">
            <div className="form-in">
              <form className="form" onSubmit={(e) => handleSubmit(e, 'email')}>
                <h3>Sign In</h3>
                <div className="sign-in-input">
                  <input type="email" className="input-in" placeholder="Email address" required />
                </div>
                <div className="sign-in-input">
                  <input type="password" className="input-in" placeholder="Password" required />
                </div>
                <button className="sign-in-button" type="submit">
                  Sign in
                </button>
                <h5 className="">
                  <center>--- --- OR --- ---</center>
                </h5>
              </form>

              <div className="form-element">
                <button className="sign-in-google" type="button" onClick={(e) => handleSubmit(e, 'google')}>
                  Google
                </button>
                <button className="sign-in-facebook" type="button" onClick={(e) => handleSubmit(e, 'facebook')}>
                  Facebook
                </button>
                <p>
                  <Link className="sign-in-reset" to="/sign-reset">
                    Password reset!
                  </Link>
                </p>
                <div className="">
                  <p className="sign-in-sign-up-text">
                    Don't have an account? <Link to="/sign-up" className="sign-in-sign-up-link">Sign up</Link>
                  </p>
                </div>

                {error && (
                  <div className="error-text-in">
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

export default Signin;
