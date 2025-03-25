import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabaseClient } from '../../service/supabase-helper.js'
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FontAwesome icons


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);


    const naviagte = useNavigate()

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        let { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (data) {
            naviagte("/home")
            return null
        }

        if (error) {
            setMessage(error.message)
            setEmail('')
            setPassword('')
            return
        }
    }

    const handleGoogleAuth = async (e) => {
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
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center pb-5">
            <div className="w-full max-w-lg px-5 md:px-6 lg:max-w-lg">
                <Link className="mt-10 text-white" to="/">
                    <div className="flex items-center">

                        <p className="text-sm text-white">{"<"} Back to the website</p>
                    </div>
                </Link>
                <div className="mt-8 flex flex-col items-center h-100 justify-between">
                    <h1 className="text-2xl font-bold text-white">Sign In</h1>
                    <p className="text-gray-400 mt-2.5">Enter your email and password to sign in!</p>

                    <div className="my-4 w-full flex items-center">
                        <div className="grow border-t border-gray-700"></div>
                        <div className="grow border-t border-gray-700"></div>
                    </div>
                    <form className="w-full max-w-xs" onSubmit={handleLoginSubmit} >
                        <div className="mb-4">
                            <label className="text-white" htmlFor="email">Email</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                autoComplete='off'
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-md  placeholder-gray-400 focus:outline-none transition-all"
                            />
                        </div>

                        <label className="text-white" htmlFor="password">Password</label>
                        <div className="flex items-center gap-2 rounded-md  bg-gray-700 p-2 mb-5 border-gray-600  transition-all">

                            <input
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                className="w-full text-white focus:outline-none  px-4 py-3 rounded-md "
                            />

                            <button
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();  // Prevent form submission
                                    setShow(!show);
                                }}
                            >
                                {show ? <FaEye className="text-xl text-white" /> : <FaEyeSlash className="text-xl text-white" />}
                            </button>
                        </div>

                        <button className="w-full bg-white text-gray-900 py-3 rounded-md hover:bg-gray-400 transition-all cursor-pointer">Sign in</button>

                    </form>
                    <div className='text-center w-full mt-3 my-2'>

                        {message && <span><h1 className='text-white'>{message}</h1></span>}
                    </div>
                </div>
                <p className="text-white mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Sign up here
                    </Link>
                </p>
                <div className="mt-8 w-full flex justify-center">

                    <form className="pb-2" onSubmit={handleGoogleAuth}>
                        <button className="transition-all cursor-pointer flex p-2 items-center justify-center w-full border border-gray-600 text-white py-3 rounded-md hover:bg-gray-800 hover:text-white">
                            <span className="mr-2">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 48 48"
                                    className="h-5 w-5"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
