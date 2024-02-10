import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginImage from './../img/4loginpage.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    }
    
  };
  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md bg-gray shadow-lg rounded-lg p-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-red-700">Sign in to Yelp</h1>
          <p className="text-gray-500">A warm welcome to you! 🍽️</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-9">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 border border-slate-400 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
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
          {loginError && (
            <div className={`bg-red-100 p-2 w-full sm:w-1/9 ${isVisible ? '' : 'hidden'}`}>
            <div className="flex space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flex-none fill-current text-red-500 h-4 w-4 cursor-pointer" onClick={handleDismiss}>
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
              </svg>
              <div className="leading-tight flex flex-col space-y-2">
                <div className="text-sm font-medium text-red-700">The email address or password you entered is incorrect :(</div>
                <div className="flex-1 leading-snug text-sm text-red-600">Try again</div>
              </div>
            </div>
          </div>
            
          )}
          <p className="mb-4">
            New to Yelp? <Link to={"/register"} className="text-blue-500">Sign up</Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Log In
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

export default Login;
