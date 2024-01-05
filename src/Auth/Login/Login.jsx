/** @format */

import React, { useState } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../redux/extraReducer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  var dipatch = useDispatch();
  // thisssss
  const { error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const [data, setData] = useState({
    // thisssss
    email: "",
    password: "",
    // thisssss
  });
  const handleLogin = (e) => {
    e.preventDefault();
    // thisssss
    dipatch(UserLogin(data));
    navigate("/");
  };
  return (
    <div className="login">
      <span id="root">
        <section class="section-all">
          {/* tis is comment */}
          <main class="main" role="main">
            {/* this is tooo */}
            <div class="wrapper">
              <article class="article">
                <div class="content">
                  <div class="login-box">
                    {/* tis is comment */}
                    <div class="header">
                      <img
                        class="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                        alt="Instagram"
                      />
                    </div>
                    <div class="thewrapform">
                      {error ? (
                        <h2>{error}</h2>
                      ) : (
                        <form class="form" onSubmit={handleLogin}>
                          <div class="input-box">
                            <input
                              type="text"
                              id="name"
                              placeholder="Phone number, username, or email"
                              name="username"
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              // tis is comment
                            />
                          </div>

                          <div class="input-box">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Password"
                              // tis is comment
                              aria-describedby=""
                              maxlength="30"
                              aria-required="true"
                              autocapitalize="off"
                              autocorrect="off"
                              // tis is comment
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <span class="button-box">
                            {/* tis is comment */}
                            <button class="btn" type="submit" name="submit">
                              Log in
                            </button>
                          </span>

                          <a class="forgot" href="">
                            Forgot password?
                            {/* tis is comment */}
                          </a>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* tis is comment */}
                  <div class="login-box">
                    <p class="text">
                      Don't have an account?<a href="/sign-in">Sign up</a>
                    </p>
                  </div>

                  <div class="app">
                    <p>Get the app.</p>
                    {/* this is tooo */}
                    <div class="app-img">
                      <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8">
                        <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/4b70f6fae447.png" />
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26utm_medium%3Dbadge">
                        <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/f06b908907d5.png" />
                      </a>
                    </div>
                  </div>
                  {/* this is tooo */}
                </div>
              </article>
            </div>
          </main>
          {/* this is tooo */}
          <footer class="footer" role="contentinfo">
            <div class="footer-container">
              <nav class="footer-nav" role="navigation">
                <ul>
                  <li>
                    <a href="">About Us</a>
                  </li>
                  <li>
                    <a href="">Support</a>
                    {/* this is tooo */}
                  </li>
                  <li>
                    <a href="">Blog</a>
                  </li>
                  <li>
                    {/* this is tooo */}
                    <a href="">Press</a>
                  </li>
                  <li>
                    <a href="">Api</a>
                  </li>
                  {/* this is tooo */}
                  <li>
                    <a href="">Jobs</a>
                  </li>
                  <li>
                    <a href="">Privacy</a>
                  </li>
                  <li>
                    {/* this is tooo */}
                    <a href="">Terms</a>
                  </li>
                  <li>
                    <a href="">Directory</a>
                  </li>
                  {/* this is tooo */}
                  <li>
                    <span class="language">
                      Language
                      <select
                        // this is tooo
                        name="language"
                        class="select"
                        onchange="la(this.value)"
                      >
                        <option value="#">English</option>
                        <option value="http://ru-instafollow.bitballoon.com">
                          Russian
                          {/* this is tooo */}
                        </option>
                      </select>
                    </span>
                  </li>
                </ul>
                {/* this is tooo */}
              </nav>

              <span class="footer-logo">&copy; 2018 Instagram</span>
            </div>
          </footer>
        </section>
      </span>
    </div>
  );
};

export default Login;
