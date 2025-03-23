import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabaseClient } from '../../service/supabase-helper.js'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

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
        <div className="bg-sky-100 flex justify-center items-center h-screen">
            {/* Left: Image */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
                    alt="Placeholder"
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Right: Login Form */}
            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    {/* Username Input */}
                    <div className="mb-4 bg-sky-100">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input
                        onChange={e => setEmail(e.target.value)}
                            placeholder='email'
                            type="text"
                            id="username"
                            name="username"
                            className="w-full border bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-800">Password</label>
                        <input
                        onChange={e => setPassword(e.target.value)}
                            placeholder='password'
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <Link to={"/reset-password"} className="hover:underline">Forgot Password?</Link>
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 shadow-lg hover:bg-blue-900 transition-all cursor-pointer text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Login
                    </button>
                </form>
                {message && <span>{message}</span>}

                {/* Sign up Link */}
                <div className="mt-6 text-blue-500 text-center ">
                    <Link to={"/register"} className="hover:underline">Sign up Here</Link>
                </div>
            </div>
        </div>
    );
};

