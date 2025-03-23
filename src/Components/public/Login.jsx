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
        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                <div>
                    <h1 >Login</h1>
                </div>
                <form className="flex flex-col items-center justify-between h-100 p-4 w-150 rounded-xl shadow-lg bg-gray-400" onSubmit={handleLoginSubmit}>


                    <input
                    className='bg-gray-200 p-2 rounded-xl border-0 shadow-lg w-full h-15'
                        required={true}
                        type="email"
                        placeholder='email'
                        autoComplete='off'
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        className='bg-gray-200 p-2 rounded-xl border-0 shadow-lg w-full h-15'

                        required={true}
                        type="password"
                        placeholder='password'
                        autoComplete='off'
                        onChange={e => setPassword(e.target.value)}
                    />



                    {message && <span>{message}</span>}

                    <button className='bg-gray-200 p-2 rounded-xl cursor-pointer hover:bg-gray-300 transition-all shadow-lg' type="submit">Sign in</button>


                    <Link to={"/register"} className='hover:underline'>
                        Don't have an account?
                    </Link>
                    <Link to={"/reset-password"} className='hover:underline'>Forgot password?</Link>
                </form>

            </div>

        </>
    )
}
