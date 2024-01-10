import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Database/firebase";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      {emailSent ? (
        <div className="container-fluid mt-5">
          {/* ... (your success alert) */}
        </div>
      ) : (
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
                {/* ... (your SVG path) */}
              </svg>

              <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  style={{ marginBottom: "10px" }}
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Reset Password
              </button>

              <div className="m-2 text-center">
                <p>
                  Go back to <Link to="/login">Login</Link>
                </p>
              </div>

              {error && (
                <div className="alert-danger alert text-center mt-4">
                  <h6>Failed to send reset password email!</h6>
                </div>
              )}

              <p className="mt-3 mb-3 text-muted">&copy; 2023</p>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
