/** @format */

import React, { useState } from "react";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/extraReducer";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.login);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "user bio",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU",
  });
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUser(data));
    navigate("/");
  };
  return (
    <>
      <div className="this-is-main-1">
        <div className="thasts-poge">
          <div className="hoder">
            {/* this is comment for login page */}
            <h1 className="logu">Picturegram</h1>
            <p>Sign up to see photos and videos from your friends.</p>
            <button>
              <i className="fab fa-facebook-square"></i> Log in with Facebook
              {/* this is comment for login page */}
            </button>
            <div>
              <p>OR</p>
              {/* this is comment for login page */}
            </div>
          </div>
          <div className="container">
            {error ? (
              <h1>{error}</h1>
            ) : (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <button type="submit">Sign up</button>
              </form>
            )}
            {/* this is comment for login page */}

            <ul>
              <li>By signing up, you agree to our</li>
              <li>
                <a href="">Terms</a>
              </li>
              <li>
                {/* this is comment for login page */}
                <a href="">Data Policy</a>
              </li>
              <li>and</li>
              <li>
                <a href="">Cookies Policy</a> .
              </li>
              {/* this is comment for login page */}
            </ul>
          </div>
        </div>
        <div className="option">
          <p>
            Have an account? <a href="/">Log in</a>
            {/* this is comment for login page */}
          </p>
        </div>
        <div className="otherapps">
          <p>Get the app.</p>
          <button type="button">
            <i className="fab fa-apple"></i> App Store
          </button>
          <button type="button">
            {/* this is comment for login page */}
            <i className="fab fa-google-play"></i> Google Play
          </button>
        </div>
        <div className="footer">
          <ul>
            <li>
              {/* this is comment for login page */}
              <a href="">ABOUT</a>
            </li>
            <li>
              <a href="">HELP</a>
            </li>
            <li>
              <a href="">PRESS</a>
            </li>
            <li>
              <a href="">API</a>
              {/* this is comment for login page */}
            </li>
            <li>
              <a href="">JOBS</a>
            </li>
            <li>
              {/* this is comment for login page */}
              <a href="">PRIVACY</a>
            </li>
            <li>
              <a href="">TEMS</a>
            </li>
            s
            <li>
              {/* this is comment for login page */}
              <a href="">LOCATIONS</a>
            </li>
            <li>
              <a href="">TOP ACCOUNTS</a>
            </li>
            {/* this is comment for login page */}
            <li>
              <a href="">HASHTAGS</a>
            </li>
            <li>
              {/* this is comment for login page */}
              <a href="">LANGUAGE</a>
            </li>
          </ul>
          <p>© 2020 PICTUREGRAM</p>
        </div>
      </div>
    </>
  );
};

export default Register;
