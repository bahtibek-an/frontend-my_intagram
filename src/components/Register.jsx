import { useState } from "react";
import { Link } from "react-router-dom";
import '../firebase/config'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { addDoc } from "firebase/firestore";
import LoginImage from './../img/4loginpage.png';

const Register = ({ itemCollectionAccount }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const confirmPass = () => confirmPassword === password;

  const submitForm = (e) => {
    e.preventDefault();
    const isConfirmed = confirmPass();
    if (isConfirmed) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .catch(() => setErrorMsg(true));
      addDoc(itemCollectionAccount, { userName, email });
    } else {
      setShowConfirmMessage(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-red-700">Sign up for Yelp</h1>
          <p className="text-gray-500">Sign up to continue to our platform</p>
        </div>
        <form onSubmit={submitForm}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="user" className="block text-sm  font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="user"
                className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              {showConfirmMessage && <p className="text-red-500 text-sm mt-1">Please confirm your password</p>}
            </div>
          </div>
          {errorMsg && <p className="text-red-500 text-sm mt-2">Change your Email or Password</p>}
          <p className="mt-3">
            Already on Yelp? <Link to={"/login"} className="text-blue-500">Sign In</Link>
          </p>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="ml-8 hidden lg:block">
      {/* eslint-disable-next-line */}
        <img src={LoginImage} className="w-80 h-auto" />
      </div>
    </div>
  );
};

export default Register;