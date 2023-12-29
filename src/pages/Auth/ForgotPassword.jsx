import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/routes";
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Circle = React.lazy(() => import("../Circle"));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
      setLoading(false);
  };

  useEffect(() => {
    document.title = "Forgot Password - Instagram";
  }, []);

  return (
    <>
      <Circle />
      <div className="position-absolute d-flex p-4 mt-5">
        {error && (
          <>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
        )}
      </div>
      <div className="register register2 d-flex justify-content-center align-items-center position-absolute">
        <form onSubmit={handleSubmit} className="fixed-top p-3">
          <h3 className="text-center mb-4">Instagram Reset Password</h3>
          <div className="form-floating mb-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control text-light bg-transparent" id="email" placeholder="name@example.com" required />
            <label for="email">Email address</label>
          </div>
          {loading ? (
              <>
                <button class="btn btn-primary w-100 mb-3" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </> ) : (
              <>
                <button type="submit" className="btn btn-primary w-100 mb-3">Reset Password</button>
              </>
          )}
        </form>
        <div className="fixed-bottom">
          <hr />
          <p className="text-center text-light fs-6">Back to <Link to={LOGIN} className="text-primary">Log In</Link></p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;