import './SignUp.css'
import fb from '../images/face.png';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "../../firebase";
import {
    setDoc,
    doc
  } from "firebase/firestore";
import {db} from '../../firebase'
import { NavLink } from 'react-router-dom';

const SignUp = ({setLogin, setId, getUser}) => {

    const email = useRef()
    const password = useRef()
    const fullname= useRef()
    const username = useRef()

    const createUser = async(id) =>{
        await setDoc(doc(db, "users", `${id}`),{ fullname: fullname.current.value, date: Number(Date.now()), username: username.current.value, email: email.current.value, profile: "", publications: [], saved: [], messages: {}, following: [], followers: []});
    }

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                console.log(userCredential.user);
                setId(userCredential.user.uid)
                createUser(userCredential.user.uid)
                setLogin()
                getUser(userCredential.user.uid, username.current.value)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className='loginpage_signup'>
                <div className='signup_desc'>Sign up to see your friends' photos and videos.</div>
                <div className='signup_with_f'>
                    <img className='signup_fb_logo' src={fb} alt="fb_logo" />
                    Login with Facebook
                </div>
                <div className='login_ordiv'>
                    <div className='login_dividor'></div>
                    <div className='login_or'>OR</div>
                    <div className='login_dividor'></div>
                </div>
                <div className='signup_form'>
                    <form onSubmit={signUp}>
                        <input type="text" placeholder='Email addres'
                            ref= {email} />
                        <input type="text" placeholder='First and last name'
                        ref={fullname} />
                        <input type="text" placeholder='Username'
                        ref={username} />
                        <input type="password" placeholder='Password'
                            ref={password} />
                    </form>
                </div>
                <div className='signup_text'>
                    People who use our service may have uploaded your contact information to Instagram.
                    <NavLink> Read more</NavLink>
                </div>
                <div className='signup_text'>
                    By registering, you agree to our
                    <NavLink> Terms </NavLink> ,
                    <NavLink> Privacy </NavLink> ,
                    <NavLink> Policy </NavLink>and
                    <NavLink> Cookie Policy</NavLink>
                </div>
                <button onClick={signUp} className='register'>Registration</button>
                
            </div>
        </>
    )
}

export default SignUp

