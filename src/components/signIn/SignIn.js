import './SignIn.css'
import fb from '../images/fb.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

const SignIn =({setLogin, setId, getUser, getUsers, login})=> {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setLogin()
        setId(userCredential.user.uid)
        getUser(userCredential.user.uid, "")
      })
      .catch((error) => {
        console.log(error);
        alert("wrong email or user or password")
      });
  };
    
        return (
            <>
                <div className='loginpage_signin'>
                    <form  onSubmit={signIn}>
                        <input className="loginpage_text" type="text" placeholder="Email addres" 
                         onChange={(e) => setEmail(e.target.value)}/>
                        <input className="loginpage_text" type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                        <button className="login_button" type='submit'>To come in</button>
                    </form>
                </div>
                <div className='login_ordiv'>
                    <div className='login_dividor'></div>
                    <div className='login_or'>OR</div>
                    <div className='login_dividor'></div>
                </div>
                <div className='login_fb'>
                    <img className="f_logo" src={fb} alt="facebook" />
                    Login with Facebook
                </div>
                <div className='login_forgt'>
                    Forgot your password?
                </div>
            </>
        )
}

export default SignIn
