import React, { useEffect, useState } from 'react';
import { BsApple } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FontAwesome icons
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth.jsx';
import Header from './Header.jsx';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);
    const { signIn } = useAuth()


    const handleGoogleLogin = async (e) => {
        e.preventDefault()
    }

    //clear message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")

            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [message])
    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-700 text-center">Sign in</h2>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            signIn(email, password);
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 mt-1  bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 "
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="flex items-center justify-between bg-white border rounded-lg p-2">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={show ? "text" : "password"}
                                    id="password"
                                    className="w-full px-3 py-2 bg-transparent focus:outline-none "
                                    placeholder="password"
                                    required
                                />
                                <button
                                    className="cursor-pointer text-gray-700 hover:text-gray-400"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShow(!show);
                                    }}
                                >
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        {message && <div className="text-center text-red-500">{message}</div>}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="flex  items-center justify-center my-4">
                        <p className="absolute px-2 text-gray-700">or</p>
                    </div>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        <FcGoogle className="w-5 h-5 mr-2" /> Sign in with Google
                    </button>
                    <button
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        <BsApple className="w-5 h-5 mr-2" /> Sign in with Apple
                    </button>
                    <div className="text-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/register" className="hover:underline text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}