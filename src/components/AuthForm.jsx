import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import authLogo from "../img/auth-logo.png";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="border border-gray-700 shadow-lg rounded-lg rounded-lg p-5 mb-4">
        <div className="flex flex-col items-center space-y-4">
        <img
          src={authLogo}
          alt="Instagram"
          className="h-20 hidden sm:block cursor-pointer"
        />

          {isLogin ? <Login /> : <Signup />}


          <div className="flex items-center justify-center my-4 space-x-1 w-full">
            <div className="block w-40 h-0.5 bg-gray-700"></div>
            <p className="mx-1 text-black">OR</p>
            <div className="w-40 h-0.5 bg-gray-700"></div>
          </div>
        </div>
      </div>

      <div className="border border-gray-700 shadow-lg rounded-lg rounded-lg p-5">
        <div className="flex items-center justify-center">
          <p className="mr-2 text-sm">
            {isLogin ? "Don't have an account?" : "Have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-700 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;