import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    
    <div className="login">
      
    <div className="login__container">
      <img src={import.meta.env.BASE_URL + "images/iphone-with-profile.jpg"} alt="iPhone with Instagram app" className="login__image hidden md:inline-block w-xl h-2.5xl"/>
      <div className="login__right w-lg md:mr-10">
        <div className="login__right-top">

          <img src={import.meta.env.BASE_URL + "images/logo.png"} alt="Instagram" className="login__logo mx-36" />

          {error && <p className="login__error">{error}</p>}

          <form onSubmit={handleLogin} method="POST" className="login__form">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
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
            ${isInvalid && 'login__submit--disabled'}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="login__signup">
          <p className="login__text">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="login__link">
              Sign up
            </Link>
          </p>
        </div>
      </div>  
    </div>  
      
    </div>
  );
}
