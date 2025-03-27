import React, { useEffect, useState } from 'react'
import { handleInputChange } from '../../js/input.js'
import { createSnippet } from '../../service/snippet-helper'
import { FetchUser } from '../../service/user-metadata'
import '../../styles/style.css'
import Header from '../Shared/Header.jsx'
import LoaderTeal from '../util/LoaderTeal.jsx'
import { Link } from 'react-router'


export default function SnippetForm() {

    const [title, setTitle] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [language, setLanguage] = useState('')
    const [description, setDescription] = useState('')
    const [userText, setUserText] = useState('')
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')

    const { user, loading } = FetchUser()


    const languages = [
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS',
        'Python',
        'Java',
        'C#',
        'C++',
        'PHP',
        'Go',
        'Rust',
        'Ruby',
        'Kotlin',
        'Swift',
        'Dart',
        'Perl',
        'Lua',
        'Haskell',
        'Elixir',
        'Clojure',
        'F#']


    const handleSnippetCreateSubmit = async (e) => {
        e.preventDefault();

        const body = {
            title: title,
            isPrivate: isPrivate,
            language: language,
            description: description,
            userText: userText,
            code: code,
            username: user.user_metadata.display_username,
            userId: user.id

        }

        if (!title || !language || !description || !code) {
            setMessage('Fill in all fields')
            return
        }
        await createSnippet(body, setMessage)
        alert("snippet has been added")
    }


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")

            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [message])

    if (loading) {

        return (
            <>
                <Header />
                <div className='flex flex-col h-screen justify-center items-center'>
                    <h1 className='text-white text-center text-2xl'>CodeBox</h1>
                    < LoaderTeal />

                    <Link to={"/"} className='text-white p-6 py-2 bg-gray-800 mt-6 rounded-xl transition-all hover:bg-gray-700'>Read more about us</Link>
                </div>
            </>
        )
    }
    return (
        <>
            <Header />
            <div className='flex justify-center h-screen'>


                <div className="flex flex-col p-6  text-white rounded-xl  w-[1000px] h-full ">
                    <h1 className="text-center text-2xl font-semibold">Create New Snippet</h1>

                    <form
                        onSubmit={handleSnippetCreateSubmit}
                        className="flex flex-col gap-4 p-4 rounded-xl "
                    >
                        {/* Title Input */}
                        <input
                            type="text"
                            className="w-full bg-gray-700 text-white rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Title"
                            onChange={e => setTitle(e.target.value)}
                            required
                        />

                        {/* Description Input */}
                        <input
                            type="text"
                            className="w-full bg-gray-700 text-white rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Provide a brief description of your snippet"
                            onChange={e => setDescription(e.target.value)}
                            required
                        />


                        {/* Language Dropdown */}
                        <select
                            className="bg-gray-700 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onChange={e => setLanguage(e.target.value)}
                            required
                        >
                            <option value="" disabled selected>Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.toLowerCase()} value={lang.toLowerCase()}>
                                    {lang}
                                </option>
                            ))}
                        </select>

                        {/* Private Snippet Checkbox */}
                        <div class="inline-flex items-center">
                            <label class="flex items-center cursor-pointer relative" for="check-2">
                                <input type="checkbox"
                                    onChange={e => setIsPrivate(e.target.checked)}
                                    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-teal-300 checked:border-slate-800"
                                    id="check-2" />
                                <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </label>
                            <label class="cursor-pointer ml-2 text-slate-600 text-sm" for="check-2">
                                Only visible to me?
                            </label>
                        </div>

                        {/* User Text Textarea */}
                        <textarea
                            placeholder="Write about your snippet (optional)..."
                            value={userText}
                            onChange={(e) => handleInputChange(e, setUserText)}
                            className="resize-none w-full bg-gray-700 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"  // Add bottom margin
                            style={{ overflow: 'hidden' }}
                        ></textarea>

                        {/* Code Textarea */}
                        <textarea
                            placeholder="Write your code here..."
                            value={code}
                            onChange={(e) => handleInputChange(e, setCode)}
                            className="resize-none w-full bg-gray-700 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"  // Add bottom margin
                            style={{ overflow: 'hidden' }}
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-400 shadow-md cursor-pointer transition-all"
                        >
                            Submit
                        </button>


                        {/* Message Display */}
                        {message && <p className="text-sm text-center mt-3">{message}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}