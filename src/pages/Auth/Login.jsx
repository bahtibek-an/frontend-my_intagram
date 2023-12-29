import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import React, { useContext, useState, useEffect } from "react";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "../../constants/routes";

const Circle = React.lazy(() => import("../Circle"));

const Login = () => {
  const portal = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      portal(HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <>
      <Circle />
      <div className="position-absolute d-flex p-4 mt-5 w-25">
        {error && (
          <>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
        )}
      </div>
      <div className="register register1 d-flex justify-content-center align-items-center position-absolute">
        <form onSubmit={handleSubmit} className="fixed-top p-3">
          <h3 className="text-center mb-4">Instagram Log In</h3>
          <div className="form-floating mb-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control text-light bg-transparent" id="email" placeholder="name@example.com" required />
            <label for="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control text-light bg-transparent" id="password" placeholder="Password" required />
            <label for="password">Password</label>
          </div>
          <p className="text-end" role="button" onClick={() => portal(FORGOTPASSWORD)}>Forgot Password?</p>
          {loading ? (
              <>
                <button class="btn btn-primary w-100 mb-3" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </> ) : (
              <>
                <button type="submit" className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>Log In</button>
              </>
          )}
          {/* <div className="d-flex justify-content-between">
            <p className="w-50 ms-3 me-3"><hr /></p>
            <p>Or</p>
            <p className="w-50 ms-3 me-3"><hr /></p>
          </div>
          <button type="button" className="btn btn-outline-primary text-light w-100 d-flex align-items-center justify-content-center"><span className="me-2 mt-1"><ion-icon name="logo-google"></ion-icon></span>Log In with Google</button> */}
        </form>
        <div className="fixed-bottom">
          <hr />
          <p className="text-center text-light fs-6">Don't have a account <Link to={SIGN_UP} className="text-primary">Sign Up</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;