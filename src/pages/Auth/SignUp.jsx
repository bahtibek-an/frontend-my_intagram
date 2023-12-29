import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import { HOME, LOGIN } from "../../constants/routes";
import { doesUsernameExist } from "../../services/firebase";
import React, { useContext, useState, useEffect } from "react";

const Circle = React.lazy(() => import("../Circle"));

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });

          navigate(HOME);
        } catch (error) {
          setFullName("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
    setLoading(false)
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <>
        <main className="main">
          <Circle />
          <div className="position-absolute w-25 d-flex p-4 mt-5">
            {error && (
              <>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </>
            )}
          </div>
          <div className="register d-flex justify-content-center align-items-center position-absolute">
              <form onSubmit={handleSubmit} className="fixed-top p-3">
                  <h3 className="text-center mb-4">Instagram Sign Up</h3>
                  <div className="form-floating mb-3">
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control text-light bg-transparent" id="userName" placeholder="user" required />
                      <label for="userName">User Name</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control text-light bg-transparent" id="fullName" placeholder="user name" required />
                      <label for="fullName">Full Name</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control text-light bg-transparent" id="email" placeholder="name@example.com" required />
                      <label for="email">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control text-light bg-transparent" id="password" placeholder="Password" required />
                      <label for="password">Password</label>
                  </div>
                  {loading ? (
                      <>
                        <button class="btn btn-primary w-100 mb-3" type="button" disabled>
                          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span class="visually-hidden" role="status">Loading...</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="submit" className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>Sign Up</button>
                      </>
                  )}
                  {/* <div className="d-flex justify-content-between">
                      <p className="w-50 ms-3 me-3"><hr /></p>
                      <p>Or</p>
                      <p className="w-50 ms-3 me-3"><hr /></p>
                  </div>
                  <button type="button" className="btn btn-outline-primary text-light w-100 d-flex align-items-center justify-content-center"><span className="me-2 mt-1"><ion-icon name="logo-google"></ion-icon></span>Sign Up with Google</button> */}
              </form>
              <div className="fixed-bottom">
                  <hr />
                  <p className="text-center text-light fs-6">Have a account <Link to={LOGIN} className="text-primary">Log In</Link></p>
              </div>
          </div>
        </main>
    </>
  );
};

export default SignUp;