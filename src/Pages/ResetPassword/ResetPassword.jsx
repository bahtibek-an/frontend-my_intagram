import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ResetPassword.css";
import InstaImage from "../../Images/photo_2023-11-28_21-56-20.jpg"

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      const authInstance = getAuth();
      await sendPasswordResetEmail(authInstance, email);
      setEmailSent(true);
    } catch (err) {
      setError("Failed to send reset password email. Please check your email address.");
    }
  };

  return (
    <>
      <div className="sign-reset">
        <div className="container-reset">

          <div className="image-reset">
            <img src={InstaImage} alt="" className="img-reset" />
          </div>

          <div class="form-div-reset">
            <form className="form-reset" onSubmit={handleSubmit}>
              <h3 className="">Reset Password</h3>

              <div className="sign-reset-input">
                <input type="email" className="input-reset" placeholder="Email" required/>
              </div>

              <button className="sign-reset-button" type="submit">
                Reset Password
              </button>

              <div className="">
                <p className="sign-reset-sign-in-text">
                  Go back to <Link className="sign-reset-sign-in-link" to="/sign-in">Login</Link>
                </p>
              </div>

              {error && (
                <div className="alert-danger alert text-center mt-4">
                  <h6>{error}</h6>
                </div>
              )}

              {emailSent && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <div>Reset password link has <br /> been sent to your email.</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;




