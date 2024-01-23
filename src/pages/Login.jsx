import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent. Please check your inbox.");
      } catch (err) {
        alert("Failed to send password reset email. Please try again.");
      }
    }
  };

  return (
    <section>
      <div className="form-box card">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail"></ion-icon>
              <input type="text" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed"></ion-icon>
              <input type="password" id="passwordInput" required />
              <label htmlFor="">Password</label>
            </div>
            <button>Log in</button>
            <div className="register">
              <p>
                Don't hava an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>

            {err && <span>Incorrect email or password!</span>}
          </form>
          <div className="register">
            <p>
              <a onClick={handleForgotPassword}>Forgot Password</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
