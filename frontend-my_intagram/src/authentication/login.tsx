import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, usernameCollection } from "../firebase/firebase-config.ts";
import { getDocs } from 'firebase/firestore';

export const Login: React.FC = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");

        try {
            setLoading(true);
            const isEmail = /\S+@\S+\.\S+/.test(identifier);

            if (isEmail) {
                await signInWithEmailAndPassword(auth, identifier, password);
                setLoading(false)
            } else {
                setLoading(true);
                const usernameQuerySnapshot = await getDocs(usernameCollection);
                const usernameDocs = usernameQuerySnapshot.docs;

                const matchedUser = usernameDocs.find((doc) => doc.data().username === identifier);

                if (matchedUser) {
                    const userEmail = matchedUser.data().email;

                    if (userEmail) {
                        await signInWithEmailAndPassword(auth, userEmail, password);
                        setLoading(false);
                    } else {
                        setErrorMessage("User email not found");
                        setLoading(false)
                        return;
                    }
                } else {
                    setErrorMessage("Username not found");
                    setLoading(false)
                    return;
                }
            }

            navigate(`/`);
        } catch (error) {
            console.error(error);
            setErrorMessage("There was an error logging in. Please check your information and try again.");
        }
    };
    return (
        <div className={"login"}>
            <section className="bg-gray-50 dark:bg-gray-900 h-full">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to={"/"}
                        className="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white font-block">
                        𝕀𝕟𝕤𝕥𝕒𝕘𝕣𝕒𝕞
                    </Link>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your Instagram account
                            </h1>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to={"/register"}
                                    className="font-medium text-primary-600 hover:underline dark:text-white"> Register
                                </Link>
                            </p>
                            <p className="bg-red-500 text-white text-center rounded-sm">{errorMessage}</p>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email or Username
                                    </label>
                                    <input
                                        type="text"
                                        name="identifier"
                                        id="identifier"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link to={""}
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-white"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
