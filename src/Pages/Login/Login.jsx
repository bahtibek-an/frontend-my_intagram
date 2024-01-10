import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Database/firebase";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="bg-white text-center body">
      <main className="formSignin card">
        <form onSubmit={handleSubmit}>
          <svg aria-label="Instagram" className="_ab6- mb-4" fill="rgb(245, 245, 245)" height="49" role="img" viewBox="32 4 113 32" width="123">
            {/* Your SVG path here */}
          </svg>
          <h1 className="h3 mb-3 fw-normal">Log in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" required />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" required />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Log in
          </button>

          <p>
            <a href="#" className="text-danger btn m-2" onClick={handleForgotPassword}>
              Password reset!
            </a>
          </p>

          <div className="m-2 text-center">
            <p>
              Don't have an account? <a href="/register" className="w3-text-blue">Sign up</a>
            </p>
          </div>

          {error && (
            <div className="alert-danger alert text-center mt-4">
              <h6>Incorrect email or password!</h6>
            </div>
          )}

          <p className="mt-3 mb-3 text-muted">&copy; 2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
