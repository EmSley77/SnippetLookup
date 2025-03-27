import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabaseClient } from '../../service/supabase.js';
import Header from './Header.jsx';


export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('javascript');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);



    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        if (password !== rePassword) {
            setMessage("Password don't match")
            return
        }

        setLoading(true)

        let { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,

            options: {
                data: { // must be in options -> data to save  
                    display_username: username,
                    name: firstname,
                    lastname: lastname,
                    preferred_language: preferredLanguage
                }
            }

        })

        if (data) {
            setMessage("account created")
            setEmail('')
            setPassword('')
            setUsername('')
            setPreferredLanguage('javascript')
            setFirstname('')
            setLastname('')
            setLoading(false)
            return
        }

        if (error) {
            setMessage(error.message)
            setEmail('')
            setPassword('')
            setLoading(false)
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
            <Header />
            <div className="flex justify-center items-center w-full h-screen bg-gray-900">
                <div className="flex flex-col p-6 w-150">
                    <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">Sign Up</h2>
                    <form onSubmit={handleRegisterSubmit} autoComplete="off" className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-full">
                                <label className="text-sm text-gray-400" htmlFor="firstname">First Name</label>
                                <input
                                    id="firstname"
                                    onChange={e => setFirstname(e.target.value)}
                                    placeholder="First Name"
                                    className={inputClass}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-sm text-gray-400" htmlFor="lastname">Last Name</label>
                                <input
                                    id="lastname"
                                    onChange={e => setLastname(e.target.value)}
                                    placeholder="Last Name"
                                    className={inputClass}
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="username">Username</label>
                            <input
                                id="username"
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                className={inputClass}
                                type="text"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="email">Email</label>
                            <input
                                id="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                className={inputClass}
                                type="email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="password">Password</label>
                            <input
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                className={inputClass}
                                type="password"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="repassword">Confirm Password</label>
                            <input
                                id="repassword"
                                onChange={e => setRePassword(e.target.value)}
                                placeholder="Confirm Password"
                                className={inputClass}
                                type="password"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="language">Preferred Language</label>
                            <select
                                id="language"
                                className={inputClass}
                                onChange={e => setPreferredLanguage(e.target.value)}
                                value={preferredLanguage}
                            >
                                {["JavaScript", "TypeScript", "HTML", "CSS", "Python", "Java", "C#", "C++", "PHP", "Go", "Rust", "Ruby", "Kotlin", "Swift", "Dart", "Perl", "Lua", "Haskell", "Elixir", "Clojure", "F#"].map(lang => (
                                    <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                                ))}
                            </select>
                        </div>
                        {message && <h1 className="text-green-400 text-center text-lg">{message}</h1>}
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-gray-400 text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            <strong>Sign in</strong>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

const inputClass = "w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 text-white";
//                                 className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
