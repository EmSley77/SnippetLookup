import React from 'react'
import '../../styles/style.css'

export default function SnippetForm({ handleSnippetCreateSubmit, setTitle, setDescription, setCode, languages, setIsPrivate, setLanguage, message }) {
    return (
        <>
            {/* New Snippet Form */}
            <div className="flex flex-col p-6 bg-white text-gray-900 rounded-xl w-1/2 shadow-xl">
                <div className='text-center'>
                    <h1 className="text-2xl font-semibold">Create New Snippet</h1>
                </div>
                <form onSubmit={handleSnippetCreateSubmit} className="flex flex-col gap-3 p-4 rounded-xl justify-between h-full w-full">

                    <input
                        type="text"
                        className="w-full bg-gray-100 text-gray-900 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        className="w-full bg-gray-100 text-gray-900 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Code"
                        className="resize-none w-full h-40 bg-gray-100 text-gray-900 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setCode(e.target.value)}
                        required
                    ></textarea>

                    <select
                        className="bg-gray-100 text-gray-900 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setLanguage(e.target.value)}
                        required
                    >
                        <option value="" disabled selected>Select Language</option>
                        {languages.map(lang => (
                            <option key={lang.toLowerCase()} value={lang.toLowerCase()}>{lang}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-2 bg-gray-100 text-gray-900 p-3 rounded-lg shadow-md">
                        <input type="checkbox" id="check" onChange={e => setIsPrivate(e.target.checked)} />
                        <label htmlFor="check" className="text-sm">Private snippet?</label>
                    </div>

                    <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 shadow-md cursor-pointer transition-all">
                        Submit
                    </button>

                    {message && <p className="text-m">{message}</p>}
                </form>
            </div>
        </>
    )
};