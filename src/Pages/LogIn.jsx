import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [error, setError] = useState(null);
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
      setError("No such user found!");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="login">
        <section>
          {Array.from({ length: 260 }, (_, index) => <span key={index}></span>)}

          <div className="signin">
            <div className="content">
              <h2>Login</h2>
              <form className="form" onSubmit={(e) => handleSubmit(e, 'email')}>
                <div className="inputBox">
                  <input type="text" required /> <i>Mail</i>
                </div>
                <div className="inputBox">
                  <input type="password" required /> <i>Password</i>
                </div>
                <div className="links">
                  <Link to="/reset-password">Forgot Password</Link>
                  <Link to="/register">Register</Link>
                </div>
                <div className="inputBox">
                  <input type="submit" value="Login" />
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
    </>
  );
};

export default Login;