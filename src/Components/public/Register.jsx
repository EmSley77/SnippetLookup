import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabaseClient } from '../../service/supabase-helper.js'
import registerImage from '../../assets/register.png'
export default function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [preferredLanguage, setPreferredLanguage] = useState('Javascript')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')



    const handleRegisterSubmit = async (e) => {
        e.preventDefault()


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
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1200px' }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                        <img src={registerImage} alt="code image" />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">Sign Up</h1>
                            <p>Enter your information to register</p>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3">
                                    <label className="text-xs font-semibold px-1">First name</label>
                                    <input
                                        onChange={e => setFirstname(e.target.value)}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-lg"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="w-1/2 px-3">
                                    <label className="text-xs font-semibold px-1">Last name</label>
                                    <input
                                        onChange={e => setLastname(e.target.value)}

                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-lg"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="flex -mx-3 mt-5">
                                <div className="w-full px-3">
                                    <label className="text-xs font-semibold px-1">Username</label>
                                    <input
                                        onChange={e => setUsername(e.target.value)}

                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-lg"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                            <div className="flex -mx-3 mt-5">
                                <div className="w-full px-3">
                                    <label className="text-xs font-semibold px-1">Email</label>
                                    <input
                                        onChange={e => setEmail(e.target.value)}

                                        type="email"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-lg"
                                        placeholder="johndoe@example.com"
                                    />
                                </div>
                            </div>
                            <div className="flex -mx-3 mt-5">
                                <div className="w-full px-3">
                                    <label className="text-xs font-semibold px-1">Password</label>
                                    <input
                                        onChange={e => setPassword(e.target.value)}

                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-lg"
                                        placeholder="********"
                                    />
                                </div>
                            </div>
                            <div className="flex -mx-3 mt-5">
                                <div className="w-full px-3">
                                    <label className="flex flex-col text-s font-semibold px-1">Preferred Coding Langauge</label>
                                    <select
                                        className='font-bold text-xl'
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



                                </div>
                            </div>
                            <div className="flex -mx-3 mt-5">
                                <div className="w-full px-3">
                                    <button type='submit' className="block w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 shadow-lg">
                                        Register
                                    </button>

                                    {message && <span><h1>h{message}</h1></span>}
                                </div>
                            </div>

                            <div className='mb-3 mt-3 w-full text-center'>
                                <Link className='text-blue-600 hover:underline' to={"/"}>Already have an account?</Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

