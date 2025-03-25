import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Header from '../Shared/Header.jsx'
import { supabaseClient } from '../../service/supabase-helper.js'
export default function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [preferredLanguage, setPreferredLanguage] = useState('Javascript')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [message, setMessage] = useState('')



    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        if (password !== rePassword) {
            setMessage("Password don't match")
            return
        }


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

        <>

            <Header />


            <div className='h-screen bg-gray-900 flex justify-center w-full'>

                <div className="  flex flex-col justify-center" >
                    <div className='text-center'>

                        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
                    </div>
                    <form className="flex flex-col justify-between h-150" onSubmit={handleRegisterSubmit}>
                        <div className="flex space-x-4 mb-4">
                            <input onChange={e => setFirstname(e.target.value)} placeholder="First Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" required />
                            <input onChange={e => setLastname(e.target.value)} placeholder="Last Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" required />
                        </div>
                        <input onChange={e => setUsername(e.target.value)} placeholder="Username" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" required />
                        <input onChange={e => setEmail(e.target.value)} placeholder="Email" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" required />

                        <input onChange={e => setPassword(e.target.value)} placeholder="Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" required />

                        <input onChange={e => setRePassword(e.target.value)} placeholder="Confirm Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" required />
                        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="language" required>
                            Preferred language
                        </label>
                        <select
                            id='language'
                            className='bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
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

                        <div className='w-full mt-4 mb-4 text-center'>
                            {message && <span><h1 className='text-white text-xl'>{message}</h1></span>}

                        </div>

                        <div className='w-full flex justify-center'>

                            <button className=" w-100 transition-all cursor-pointer bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded  hover:shadow-lg py-3 px-4 border border-yellow-300 hover:border-transparent ">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className='w-full mt-5 text-center'>
                        <Link className='text-blue-500 hover:underline transition-all' to={"/login"}>Already have an account? {""} sign in</Link>

                    </div>
                </div>
            </div>

        </>

    );
};

