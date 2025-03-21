import { useState, useEffect } from 'react'
import React from 'react'
import { supabaseClient } from '../../../Helper/supabase-helper'
import { Link } from 'react-router'

export default function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [preferredLanguage, setPreferredLanguage] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')



    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        let { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password, options: {
                display_username: username,
                name: firstname,
                lastname: lastname,
                preferred_language: preferredLanguage
            }
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
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",


                }}>
                <div>
                    <h1 style={{ color: "#fff" }}>Register</h1>
                </div>
                <form className="form" onSubmit={handleRegisterSubmit}>


                    <input
                        required={true}
                        type="text"
                        placeholder='firstname'
                        autoComplete='off'
                        onChange={e => setFirstname(e.target.value)}
                    />

                    <input
                        required={true}
                        type="text"
                        placeholder='lastname'
                        autoComplete='off'
                        onChange={e => setLastname(e.target.value)}
                    />

                    <input
                        required={true}

                        type="text"
                        placeholder='username'
                        autoComplete='off'
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        required={true}
                        type="email"
                        placeholder='email'
                        autoComplete='off'
                        onChange={e => setEmail(e.target.value)}
                    />

                    <h3>Choose a preferred language</h3>
                    <select
                        onChange={e => setPreferredLanguage(e.target.value)}
                        value={preferredLanguage}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="cpp">C++</option>
                        <option value="php">PHP</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                        <option value="ruby">Ruby</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="swift">Swift</option>
                        <option value="dart">Dart</option>
                        <option value="perl">Perl</option>
                        <option value="lua">Lua</option>
                        <option value="haskell">Haskell</option>
                        <option value="elixir">Elixir</option>
                        <option value="clojure">Clojure</option>
                        <option value="fsharp">F#</option>
                    </select>


                    <input
                        required={true}
                        type="password"
                        placeholder='password'
                        autoComplete='off'
                        onChange={e => setPassword(e.target.value)}
                    />

                    {message && <span style={{ color: "#fff", fontWeight: "700" }}>{message}</span>}

                    <button type="submit">Register</button>

                    <Link to={"/"} style={{ color: "var(--clr)", textDecoration: "none" }}>
                        Already have an account? Sign in
                    </Link>
                </form>

            </div>

        </>
    )
}

