import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabaseClient } from '../../../Helper/supabase-helper';

export default function PasswordUpdate() {

    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [message, setMessage] = useState('')

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (rePassword !== password) {
            setMessage("Passwords dont match")
            return;
        }

        //when depolying this in Netlify or vercel  
        const { error } = await supabaseClient.auth.updateUser({ password: password })

        if (error) {
            setMessage(error.message)
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
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>

                <div>
                    <h1 style={{ color: "#fff" }}>Enter your email</h1>
                </div>
                <form className="form" onSubmit={handleResetPasswordSubmit}>


                    <input
                        required={true}
                        type="password"
                        placeholder='password'
                        autoComplete='off'
                        onChange={e => setPassword(e.target.value)}
                    />


                    <input
                        required={true}
                        type="password"
                        placeholder='enter password again'
                        autoComplete='off'
                        onChange={e => setRePassword(e.target.value)}
                    />

                    {message && <span style={{ color: "#fff", fontWeight: "700" }}>{message}</span>}

                    <button type="submit">Submit</button>


                    <Link to={"/reset-password"} style={{ color: "var(--clr)", }}>
                        Return
                    </Link>
                </form>
            </div>
        </>
    )
}
