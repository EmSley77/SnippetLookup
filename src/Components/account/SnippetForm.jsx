import React from 'react'
import '../../styles/style.css'

export default function SnippetForm({ handleSnippetCreateSubmit, setTitle, setDescription, setCode, languages, setIsPrivate, setLanguage, message }) {
    return (
        <>
            {/* New Snippet Form */}
            <div className="flex flex-col justify-between p-6 bg-gray-900 text-white rounded-xl ">
                <div className='flex w-full justify-center items-center'>

                    <h1 className="text-2xl font-semibold ">Create New Snippet</h1>
                </div>
                <form onSubmit={handleSnippetCreateSubmit} className="flex flex-col gap-3 p-4  rounded-xl  justify-between h-full w-full">

                    <input
                        type="text"
                        className="w-full bg-gray-700 rounded-lg p-3 shadow-md"
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        className="w-full bg-gray-700 rounded-lg p-3 shadow-md"
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Code"
                        className="resize-none w-full h-40 bg-gray-700 p-3 rounded-lg shadow-md "
                        onChange={e => setCode(e.target.value)}
                        required
                    ></textarea>

                    <select className="bg-gray-700 p-3 rounded-lg shadow-md" onChange={e => setLanguage(e.target.value)} required>
                        <option value="" disabled selected>Select Language</option>
                        {languages.map(lang => (
                            <option key={lang.toLowerCase()} value={lang.toLowerCase()}>{lang}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-lg shadow-md">
                        <input type="checkbox" id="check" onChange={e => setIsPrivate(e.target.checked)} />
                        <label htmlFor="check" className="text-sm">Private snippet?</label>
                    </div>

                    <button type="submit" className="p-3 bg-gray-700 rounded-lg hover:bg-gray-500 shadow-md cursor-pointer transition-all">
                        Submit
                    </button>

                    {message && <p className="text-red-500 text-sm">{message}</p>}
                </form>
            </div>
        </>
    )
}
