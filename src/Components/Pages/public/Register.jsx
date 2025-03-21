import { useState, useEffect } from 'react'
import React from 'react'
import { supabaseClient } from '../../../Helper/supabase-helper'
import { Link } from 'react-router'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')



    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            setMessage("please fill in all neccessary fields")
            return
        }


        let { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (data) {
            console.log(data);
            setMessage("account created")
            setEmail('')
            setPassword('')
            return
        }

        if (error) {
            setMessage(error.message)
            setEmail('')
            setPassword('')
            return
        }

        setEmail('')
        setPassword('')
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
                <div>
                    <h1 style={{ color: "#fff" }}>Register</h1>
                </div>
                <form className="form" onSubmit={handleRegisterSubmit}>


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

                    {message && <span style={{ color: "#fff;", fontWeight: "700" }}>{message}</span>}

                    <button type="submit">Register</button>

                    <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
                        Already have an account? Sign in
                    </Link>
                </form>

            </div>

        </>
    )
}

