import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();
  return (
    <>
      <input
        className="block w-60 border border-gray-700 rounded-md py-2 px-3 mb-3 text-sm"
        placeholder="Email*"
        type="email"
        size="sm"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <input
        className="block w-60 border border-gray-700 rounded-md py-2 px-3 mb-3 text-sm"
        placeholder="Password*"
        type="password"
        size="sm"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {error && (
        <div className="bg-red-100 border border-red-700 text-red-700 px-4 py-2 rounded-md mb-3">
          <p>
          Email or password is incorrect
          <br></br>
          Please, try again
          </p>
        </div>
      )}
      <button
        className="w-60 bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-lg py-2 px-4 rounded-md text-sm"
        onClick={() => login(inputs)}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </>
  );
};

export default Login;
