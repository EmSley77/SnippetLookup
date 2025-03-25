import React, { useState } from 'react';
import { Link } from 'react-router';
import { supabaseClient } from '../../service/supabase-helper';

export default function ResetPassword() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        //when depolying this in Netlify or vercel  
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://example.com/account/update-password', // must have a domain and be deployed
        })

        if (error) {
            setMessage(error.message)
        }

    }
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
                    <h1 style={{ color: "#fff" }}>Enter your email</h1>
                </div>
                <form className="form" onSubmit={handleResetPasswordSubmit}>

                    <input
                        required={true}
                        type="email"
                        placeholder='email'
                        autoComplete='off'
                        onChange={e => setEmail(e.target.value)}
                    />

                    {message && <span style={{ color: "#fff", fontWeight: "700" }}>{message}</span>}

                    <button type="submit">Submit</button>


                    <Link to={"/login"} style={{ color: "var(--clr)", }}>
                        Return
                    </Link>
                </form>
            </div>
        </>
    )
}
