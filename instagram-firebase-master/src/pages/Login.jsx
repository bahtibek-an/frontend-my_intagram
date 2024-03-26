import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./Register.css"
// icons
import { ImFacebook2 as FacebookIcon } from "react-icons/im";
import { AiFillEye as EyeIcon } from "react-icons/ai";
import { AiFillEyeInvisible as EyeInvisibleIcon } from "react-icons/ai";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

// utilities
import { isValidEmail } from "../utility";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);

  if (user) navigate("/");

  const showError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) showError("Invalid email address");
    else if (password.length < 6)
      showError("Password must be at least 6 characters");
    if (isValidEmail(email) && password.length > 6) {
      setFormLoading(true);
      const user = await login(email, password);
      if (user) {
        setEmail("");
        setPassword("");
        setFormLoading(false);
      }
      if (!user)
        showError(
          "Sorry, your password was incorrect. Please double-check your password."
        );
    }
  };

  useEffect(() => {
    setDisabled(email.length > 0 && password.length > 0 ? false : true);
  }, [email, password]);

  return (
    <>
      <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
        <div className="flex items-center">
        <div className="imges hidden md:block">
          <img
            src="/images/iphone.png"
            className="img max-h-[500px]"
            alt="login"
          />
            <img
            src="/images/iphone.png"
            className="imgg max-h-[500px]"
            alt="login"
          />
        </div>
          <div className="flex flex-col flex-shrink-0 w-[350px]">
            <div className="flex flex-col items-center justify-center rounded w-full border-[1px] border-gray-300 bg-white p-6">
              <div className="w-full">
              <img
                  src="/images/Instagram_logo.svg.png"
                  className="h-14 mt-2 mx-auto my-2"
                  alt="instagram"
                />
              </div>
              <div className="w-full px-5">
                <form
                  className=""
                  method="POST"
                  onSubmit={(e) => submitForm(e)}
                >
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input
                          placeholder="Phone number, username, or email"
                          name="username"
                          type="text"
                          className="text-xs p-2 border-[1px] rounded bg-gray-200/10 w-full border-gray-300"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="relative">
                        <input
                          type={showPassword ? "password" : "text"}
                          className="text-xs p-2 border-[1px] rounded bg-gray-200/10 w-full border-gray-300"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        {password.length > 0 && (
                          <div className="absolute top-0 right-2 h-full flex items-center">
                            <button
                              className="cursor-pointer text-slate-800"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeIcon />
                              ) : (
                                <EyeInvisibleIcon />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-2">
                      <button
                        className="w-full bg-blue-400 text-xs text-white font-semibold p-1 rounded-sm"
                        disabled={disabled}
                        type="submit"
                      >
                        {formLoading ? (
                          <SpinnerIcon className="w-3 h-3 animate-spin my-1 mx-auto" />
                        ) : (
                          "Log in"
                        )}
                      </button>
                    </div>
                    <div className="flex gap-2 items-center my-3">
                      <div className="border-b-[1px] bg-transparent border-gray-400 h-0 w-full"></div>
                      <div className="uppercase text-gray-500 font-semibold text-base">
                        or
                      </div>
                      <div className="border-b-[1px] bg-transparent border-gray-400 h-0 w-full"></div>
                    </div>
                    <div className="my-4 ">
                      <button
                        className="text-[#4267B2] flex items-center justify-center w-full"
                        type="button"
                        disabled
                      >
                        <FacebookIcon fill="#4267B2" />
                        <span className="text-xs font-semibold ml-1">
                          Log in with Facebook
                        </span>
                      </button>
                    </div>
                  </div>
                  {errorMsg?.length > 0 && (
                    <div className="text-center text-xs my-4 text-red-600">
                      {errorMsg}
                    </div>
                  )}
                  <div className="text-center w-full text-xs font-thin mb-4">
                    <a href="/forgot-password">Forgot password?</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded w-full border-[1px] border-gray-300 mt-4 bg-white p-6">
              <div className="text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 font-semibold">
                  Sign up
                </Link>
              </div>
            </div>

            
            <div class="bottom1">
              <a aria-label="Get it on Google Play"
                class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _aa5s _a6hd"
                href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.instagram.android%26referrer%3Dig_mid%253D1537D9F5-4126-407F-A303-DBA69DF38C61%2526utm_campaign%253DsignupPage%2526utm_content%253Dlo%2526utm_source%253Dinstagramweb%2526utm_medium%253Dbadge%2526original_referrer%253Dhttps%25253A%25252F%25252Fwww.instagram.com%25252Fshohruz_oken_07%25252F%25253Fnext%25253D%2525252F&amp;e=AT0BW9mA6z21wQxca9nHBDDCoxbKamsgB8h81JobKlqUBaia3isWutAVpot3LJ8wBk5p4GD_75eLBkLn_MtbcwqzJvK5xU7EVi-rNfJ_QEIn84thoD-mumioiQqhGJglJkKGpU1-T1qqUG3eQn_byg"
                rel="nofollow noreferrer" role="link" tabindex="0" target="_blank">
                <img alt="Get it on Google Play"
                  class="_aa5q" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" />
              </a>
              <a aria-label="Get it from Microsoft"
                class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _aa5s _a6hd"
                href="ms-windows-store://pdp/?productid=9nblggh5l9xt&amp;referrer=appbadge&amp;source=www.instagram.com&amp;mode=mini&amp;pos=0%2C0%2C1920%2C1020"
                rel="nofollow noreferrer" role="link" tabindex="0" target="_blank">
                <img alt="Get it from Microsoft"
                  class="_aa5q"
                  src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" />
              </a>
            </div>

          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
