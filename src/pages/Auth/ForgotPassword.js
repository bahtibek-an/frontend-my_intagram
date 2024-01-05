import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import Login from './Login';
import { LOGIN } from '../../constants/routes';

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            setError(`${error.code} ${error.message}`)
        });
    }

    const isInvalid = email.trim() === '';

    useEffect(() => {
        document.title = "Forgot Password - Instagram";
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="p-4 bg-white border border-gray-primary mb-4 w-80 rounded">
                    <div className="instagram-font text-5xl text-center mb-8">
                        Forgot Password
                    </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder="Email address"
                                className="text-sm text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-inst cursor-pointer text-white rounded w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
                <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">
                        <Link to={LOGIN} className="font-bold text-blue-inst">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
