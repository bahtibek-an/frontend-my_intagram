import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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
      setError(null);
    } catch (err) {
      setError("Failed to send reset password email. Please check your email address.");
      setEmailSent(false);
    }
  };

  return (
    <div className="resetPassword">
      <section>
        {Array.from({ length: 260 }, (_, index) => <span key={index}></span>)}
        <div className="signin">
          <div className="content">
            <h2>Password reset</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="inputBox">
                <input type="email" required/> 
                <i>Mail</i>
              </div>
              <div className="links">
                <Link to="/login">Login</Link>
              </div>
              <div className="inputBox">
                <input type="submit" value="Reset" />
              </div>
              {error && (
                <div className="err-text">
                  <center>
                    <h5>{error}</h5>
                  </center>
                </div>
              )}
              {emailSent && (
                <div className="success-text">
                  <center>
                    <h5>Password reset email sent successfully!</h5>
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

export default ResetPassword;