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

        <div
            className="min-h-screen bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
            }}
        >
            <div className="flex justify-end">
                <div className="bg-gray-900 text-white min-h-screen w-1/2 flex justify-center items-center">
                    <div>
                        <form onSubmit={handleLoginSubmit}>
                            <div className='text-center'>
                                <h1 className="text-2xl font-bold">Login </h1>
                            </div>
                            <div className="mt-5">
                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        autoComplete='off'
                                        onChange={e => setEmail(e.target.value)}
                                        className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                    />
                                </div>
                                <label className="block text-md mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className='flex w-full  border-2 items-center py-2 rounded-md '>

                                    <input
                                        onChange={e => setPassword(e.target.value)}

                                        className="px-4 w-full  text-sm outline-none focus:outline-none"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                    />

                                    <button className='p-2 cursor-pointer' onClick={(e) => {
                                        e.preventDefault()
                                        setShow(!show)
                                    }}>

                                        {show ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-center mt-4 mb-4">

                                <Link to={"/reset-password"} className="text-sm text-blue-700 hover:underline cursor-pointer">
                                    Forgot password?
                                </Link>
                            </div>
                            <div>
                                <div className='text-center'>
                                    {message && <span className='mt-2 mb-2'><h1>{message}</h1></span>}

                                </div>
                                <div className='flex w-full flex-col mb-4 mt-4'>
                                    <button className="transition-all cursor-pointer bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded  hover:shadow-lg py-3 px-4 border border-yellow-300 hover:border-transparent ">
                                        Login
                                    </button>

                                </div>
                                <div className="flex space-x-3 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition-all ">
                                    <img
                                        className="h-5 cursor-pointer"
                                        src="https://i.imgur.com/arC60SB.png"
                                        alt="google icon"
                                    />
                                    <button className='cursor-pointer' onClick={handleGoogleLogin}>Continue with Google</button>
                                </div>
                            </div>
                        </form>
                        <p className="mt-8">
                            Don't have an account?{' '}
                            <Link to={"/register"} className="cursor-pointer text-sm text-blue-600">
                                Join free today
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};
