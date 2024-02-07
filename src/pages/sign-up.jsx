import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="login">
      <div className="login__container">
        <img
          src={import.meta.env.BASE_URL + "images/iphone-with-profile.jpg"}
          alt="iPhone with Instagram app"
          className="login__image hidden md:inline-block w-xl h-2.5xl"
        />

        <div className="login__right w-lg md:mr-10">
          <div className="login__right-top">
            <img
              src={import.meta.env.BASE_URL + "images/logo.png"}
              alt="Instagram"
              className="login__logo mx-36"
            />

            {error && <p className="login__error">{error}</p>}

            <form onSubmit={handleSignUp} method="POST" className="login__form">
              <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="login__input"
                onChange={({ target }) => setUsername(target.value)}
                value={username}
              />
              <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Full name"
                className="login__input"
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
              />
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="login__input"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="login__input"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`btn login__submit
            ${isInvalid && "login__submit--disabled"}`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="login__signup">
            <p className="login__text">
              Have an account?{` `}
              <Link to={ROUTES.LOGIN} className="login__link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
