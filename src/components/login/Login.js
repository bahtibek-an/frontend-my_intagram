import React from "react";
import Logo from "../../photos/logo.png";
import Google from "../../photos/google.png";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import "../login/Login.css"

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };
  return (
    <div className="LoginContainer">
      <div className="ContentsWrapper">
        <img src= { Logo } alt="Logo" />
        <p>Instagram</p>
        <button onClick= { signIn }>
          <img src={ Google } alt="Google logo" />
          <span style={{ paddingRight: 20 }}>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;