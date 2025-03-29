import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.jsx'
import { createSnippet } from '../../service/snippets.js'
import '../../styles/style.css'
import useSections from '../../hooks/useSections.jsx';
import { Link } from 'react-router'
import LoaderTeal from '../helper/loaders/LoaderTeal.jsx'
import Header from './Header.jsx'


export default function CreateSnippet() {

    const [title, setTitle] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')
    const [sections, setSections] = useState([])
    const { savePost } = useSections()
    const [language, setLanguage] = useState("JavaScript")

 
    const { user, loading } = useAuth()

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

        if (!user) return;

        const body = {
            title: title,
            isPrivate: isPrivate,
            description: description,
            username: user.user_metadata.display_username,
            userId: user.id
        }

        if (!title || !description) {
            setMessage('Fill in all fields')
            return
        }
        const data = await createSnippet(body, setMessage)

        await savePost(sections, data[0].id)
        alert("blog has been posted")
    }


    const addSection = (type) => {
        setSections(sections.concat({ id: Date.now(), type, content: "" }))
    };

    const updateSection = (id, content) => {
        setSections(sections.map(sec => sec.id === id ? { ...sec, content } : sec));
    };

    const updateCodeSection = (id, content, language) => {
        setSections(sections.map(sec => sec.id === id ? { ...sec, content, language } : sec));
    };

    //filter out where id !== and keep the rest
    const removeSection = (id) => {
        setSections(sections.filter(sec => sec.id !== id));
    };



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



                        {/* Private Snippet Checkbox */}
                        <div className="inline-flex items-center">
                            <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                                <input type="checkbox"
                                    onChange={e => setIsPrivate(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-teal-300 checked:border-slate-800"
                                    id="check-2" />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd">
                                        </path>
                                    </svg>
                                </span>
                            </label>
                            <p className="ml-2 text-gray-400">
                                Only visible to me?
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Create Post</h2>

                        {/* Section List */}
                        {sections.map((sec, index) => (
                            <div key={sec.id} className="mb-4">
                                <label className="block text-sm font-semibold text-gray-400">
                                    Section {index + 1} ({sec.type})
                                </label>
                                {sec.type === "code" ? (
                                    <>
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


                                        <textarea
                                            placeholder="Enter code..."
                                            value={sec.content}
                                            onChange={(e) => updateCodeSection(sec.id, e.target.value, language)}
                                            className="w-full p-2 mt-1 bg-gray-700 text-green-400 font-mono border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
                                        />
                                    </>
                                ) : (
                                    <textarea
                                        placeholder={`Enter ${sec.type}...`}
                                        value={sec.content}
                                        onChange={(e) => updateSection(sec.id, e.target.value)}
                                        className="w-full p-2 mt-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeSection(sec.id)}
                                    className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                        }

                        {/* Add Section Buttons */}
                        <div className="flex gap-2 flex-wrap mb-4">
                            <button type="button" onClick={() => addSection("text")} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                Add Text
                            </button>
                            <button type="button" onClick={() => addSection("code")} className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
                                Add Code
                            </button>
                            <button type="button" onClick={() => addSection("requirements")} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                                Add Requirements
                            </button>
                            <button type="button" onClick={() => addSection("block")} className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
                                Add Block
                            </button>
                        </div>



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