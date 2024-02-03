import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../Datebase/Datebase"; 
import { getDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
        photoURL: "https://cdn-icons-png.flaticon.com/512/660/660611.png",
      });

      const userCountDocRef = doc(db, "UserID", "count");
      const countSnap = await getDoc(userCountDocRef);
      const currentCount = countSnap.exists() ? countSnap.data().count : 0;

      await setDoc(doc(db, "Users", res.user.uid), {
        uid: res.user.uid,
        id: currentCount,
        displayName,
        email,
        password,
        photoURL: "https://cdn-icons-png.flaticon.com/512/660/660611.png",
      });

      await setDoc(doc(db, "UserUID", res.user.uid), {});
      await setDoc(userCountDocRef, { count: currentCount + 1 });
      navigate("/");
    } catch (err) {
      setError("Sign-Up Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="p-8 bg-white rounded shadow-md w-96">
          <h1 className="flex justify-between mb-6 text-2xl font-bold">
            <div>Register</div>
            <div>🅸🅽🆂🆃🅰🅶🆁🅰🅼</div>
          </h1>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <Link to="/login" className="block mt-4 text-sm text-blue-500 hover:underline">
            Do you have an account? Sign in to your account here.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
