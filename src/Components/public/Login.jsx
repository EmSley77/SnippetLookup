import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabaseClient } from '../../service/supabase-helper.js'
import '../../styles/login.css'

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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}>
                <div>
                    <h1 style={{ color: "#fff" }}>Login</h1>
                </div>
                <form className="form" onSubmit={handleLoginSubmit}>


                    <input
                        required={true}
                        type="email"
                        placeholder='email'
                        autoComplete='off'
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        required={true}
                        type="password"
                        placeholder='password'
                        autoComplete='off'
                        onChange={e => setPassword(e.target.value)}
                    />



                    {message && <span style={{ color: "#fff", fontWeight: "700" }}>{message}</span>}

                    <button type="submit">Sign in</button>


                    <Link to={"/register"} style={{ color: "var(--clr)", textDecoration: "none" }}>
                        Don't have an account?
                    </Link>
                    <Link to={"/reset-password"} style={{ color: "var(--clr)" }}>Forgot password?</Link>
                </form>

            </div>

        </>
    )
}
