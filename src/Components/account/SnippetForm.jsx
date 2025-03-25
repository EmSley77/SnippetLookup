import React from 'react'
import '../../styles/style.css'


export default function SnippetForm({
    handleSnippetCreateSubmit,
    setTitle,
    setDescription,
    setCode,
    languages,
    setIsPrivate,
    setLanguage,
    message
}) {
    return (
        <div className="flex flex-col p-6 bg-gray-900 text-white rounded-xl shadow-xl w-full ">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-semibold">Create New Snippet</h1>
            </div>

            <form
                onSubmit={handleSnippetCreateSubmit}
                className="flex flex-col gap-4 p-4 rounded-xl bg-gray-800"
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
                    placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                {/* Code Textarea */}
                <textarea
                    placeholder="Code"
                    className="resize-none w-full h-40 bg-gray-700 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={e => setCode(e.target.value)}
                    required
                ></textarea>

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
                <div className="flex items-center gap-2 bg-gray-700 text-white p-3 rounded-lg shadow-md">
                    <input
                        type="checkbox"
                        id="check"
                        onChange={e => setIsPrivate(e.target.checked)}
                    />
                    <label htmlFor="check" className="text-sm">Private snippet?</label>
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
    );
}