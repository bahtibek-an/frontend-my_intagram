import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../Datebase/Datebase";

function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const email = e.target[0].value;
            const password = e.target[1].value;
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="p-8 bg-white rounded shadow-md w-96">
                    <h1 className="flex justify-between mb-6 text-2xl font-bold">
                        <div>Login</div>
                        <div>🅸🅽🆂🆃🅰🅶🆁🅰🅼</div>
                    </h1>

                    {error && <div className="mb-4 text-red-500">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <input
                                type="text"
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
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <Link to="/register" className="block mt-4 text-sm text-blue-500 hover:underline">
                        Don't have an account? Sign up here.
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
