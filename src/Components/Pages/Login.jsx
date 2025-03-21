import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabaseClient } from '../../Helper/supabase-helper'
import '../../Styles/login.css'

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
                <form className="form" onSubmit={handleLoginSubmit}>

                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type="email"
                        placeholder='email'
                        autoComplete='off'
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type="password"
                        placeholder='password'
                        autoComplete='off'
                        onChange={e => setPassword(e.target.value)}
                    />


                    <Link to={"/"} style={{ color: "#58bc82" }}>Forgot password?</Link>

                    {message && <span style={{ color: "#fff", fontWeight: "700" }}>{message}</span>}

                    <button type="submit"  >Sign in</button>

                    <Link to={"/register"} style={{ color: "#fff", textDecoration: "none" }}>
                        Don't have an account? Sign up
                    </Link>
                </form>

            </div>

        </>
    )
}
