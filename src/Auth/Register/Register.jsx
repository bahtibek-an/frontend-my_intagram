/** @format */

import React, { useState } from "react";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/extraReducer";
const Register = () => {
  const { error } = useSelector((state) => state.login);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    phone:"user bio",
    photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU"
  });
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUser(data));
  };
  return (
    <>
      <div className='main_1'>
        <div className='page'>
          <div className='header'>
            <h1 className='logo'>Picturegram</h1>
            <p>Sign up to see photos and videos from your friends.</p>
            <button>
              <i className='fab fa-facebook-square'></i> Log in with Facebook
            </button>
            <div>
              <p>OR</p>
            </div>
          </div>
          <div className='container'>
            {error ? (
              <h1>{error}</h1>
            ) : (
              <form onSubmit={handleRegister}>
                <input
                  type='text'
                  placeholder='Full Name'
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type='email'
                  placeholder='Email'
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  type='password'
                  placeholder='Password'
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <button type='submit'>Sign up</button>
              </form>
            )}

            <ul>
              <li>By signing up, you agree to our</li>
              <li>
                <a href=''>Terms</a>
              </li>
              <li>
                <a href=''>Data Policy</a>
              </li>
              <li>and</li>
              <li>
                <a href=''>Cookies Policy</a> .
              </li>
            </ul>
          </div>
        </div>
        <div className='option'>
          <p>
            Have an account? <a href='/'>Log in</a>
          </p>
        </div>
        <div className='otherapps'>
          <p>Get the app.</p>
          <button type='button'>
            <i className='fab fa-apple'></i> App Store
          </button>
          <button type='button'>
            <i className='fab fa-google-play'></i> Google Play
          </button>
        </div>
        <div className='footer'>
          <ul>
            <li>
              <a href=''>ABOUT</a>
            </li>
            <li>
              <a href=''>HELP</a>
            </li>
            <li>
              <a href=''>PRESS</a>
            </li>
            <li>
              <a href=''>API</a>
            </li>
            <li>
              <a href=''>JOBS</a>
            </li>
            <li>
              <a href=''>PRIVACY</a>
            </li>
            <li>
              <a href=''>TEMS</a>
            </li>
            s
            <li>
              <a href=''>LOCATIONS</a>
            </li>
            <li>
              <a href=''>TOP ACCOUNTS</a>
            </li>
            <li>
              <a href=''>HASHTAGS</a>
            </li>
            <li>
              <a href=''>LANGUAGE</a>
            </li>
          </ul>
          <p>© 2020 PICTUREGRAM</p>
        </div>
      </div>
    </>
  );
};

export default Register;
