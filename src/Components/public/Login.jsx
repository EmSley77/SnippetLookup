import React, { useEffect, useState } from 'react';
import { BsApple } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FontAwesome icons
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { supabaseClient } from '../../service/supabase-helper.js';
import Header from '../Shared/Header.jsx';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);


    const navigate = useNavigate()

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        let { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (data) {
            navigate("/home")
            return null
        }

        if (error) {
            setMessage(error.message)
            setEmail('')
            setPassword('')
            navigate("/login")
            
        }
    }

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
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Sign in</h2>
                    <form className="mt-4 space-y-4" onSubmit={handleLoginSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className='flex space-x-2 py-2 items-center justify-between'>

                                <input
                                    onChange={e => setPassword(e.target.value)}

                                    type={show ? "text" : "password"}
                                    id="password"
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    // placeholder="••••••••"
                                    placeholder="password"
                                    required
                                />

                                <button className='cursor-pointer' onClick={e => {
                                    e.preventDefault()
                                    setShow(!show)
                                }}>
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        <div className='text-center'>

                            {message && <span className='text-xl text-red-600'>{message}</span>}
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="relative flex items-center justify-center my-4">
                        <span className="absolute px-2 text-gray-500 bg-white">or</span>
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <button onClick={handleGoogleLogin}
                        className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        <FcGoogle className="w-5 h-5 mr-2" /> Sign in with Google
                    </button>
                    <button
                        className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        <BsApple className="w-5 h-5 mr-2" /> Sign in with Apple
                    </button>
                    <div className='text-center'>
                        <p>Dont have an account?{''} <Link to={"/register"} className='hover:underline'><strong className='text-blue-500'>Sign up</strong></Link> </p>
                    </div>
                </div>

            </div>
        </>
    );
};

