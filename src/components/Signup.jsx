
import { useState } from "react";
import useSignupWithEmailAndPassword from "../hooks/useSignupWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignupWithEmailAndPassword();

  return (
    <>
    <div>
        <input
          placeholder="Email*"
          className="block w-60 border border-gray-500 rounded-md py-2 px-3 mb-3 text-sm"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        
        <input
          placeholder="Full name*"
          className="block w-60 border border-gray-500 rounded-md py-2 px-3 mb-3 text-sm"
          type="text"
          value={inputs.fullname}
          onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
        />

        <input
          placeholder="Username*"
          className="block w-60 border border-gray-500 rounded-md py-2 px-3 mb-3 text-sm "
          type="text"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />

        <div className="relative">

          <input
            placeholder="Password*"
            className="block w-60 border border-gray-500 rounded-md py-2 px-3 mb-3 text-sm"
            type={showPassword ? 'text' : 'password'}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <p>Hide</p> : <p>Show</p>}
          </button>

        </div>

        {error && (
          <div className="block w-60 items-center bg-red-50 border border-red-400 text-red-700 px-4 py-1 rounded-md mb-6">
            <p className="text-center">
              Something went wrong 
                <br></br> 
              Please, try again
            </p>
          </div>
        )}

        <button
          className="w-full bg-blue-500 shadow-lg rounded-lg hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm "
          disabled={loading}
          onClick={() => signup(inputs)}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

      </div>
    </>
  );
};

export default Signup;
