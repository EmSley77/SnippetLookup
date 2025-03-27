import React, { useEffect, useState } from 'react';
import { copyCode } from '../../utils/helpers.js';
import { removeSaved } from '../../service/snippets.js';
import useAuth from '../../hooks/useAuth.jsx'
export default function SavedCard({ snippet }) {

    const [isCopied, setIsCopied] = useState(false)
    const [message, setMessage] = useState('')
    const { user, loading } = useAuth()

    useEffect(() => {
        if (isCopied) {
            setMessage("Copied code")
            const timer = setTimeout(() => {
                setIsCopied(false)
                setMessage('')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isCopied])

    const handleDelete = async () => {
        const params = {
            userId: user.id,
            snippetId: snippet.id,
        }
        await removeSaved(params)
    }


    if (loading) return <><h1>Loading...</h1></>

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-xl hover:shadow-2xl  transition-all">
            <div className="flex flex-col overflow-y-auto justify-between">

                {/* Title */}
                <div className="h-full">
                    <span className="text-lg font-semibold uppercase tracking-wide text-white">
                        {snippet.title.toUpperCase()}
                    </span>
                </div>

                <hr className="border-teal-500 my-2" />

                {/* Description */}
                <p className="text-gray-300 text-sm mb-5 mt-3">{snippet.description.toUpperCase()}</p>

                {/* Language */}
                <div className="text-sm font-medium mt-auto">
                    <span className="px-2 py-2 bg-teal-400 text-white font-bold rounded-2xl">
                        {snippet.language}
                    </span>
                </div>

                {/* Code block */}
                <pre
                    onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}
                    className='drop-shadow-lg bg-gray-800 p-3 rounded-xl mt-4 whitespace-pre-wrap break-words overflow-y-scroll h-full scroll-smooth cursor-pointer text-teal-300'
                >
                    {snippet.code}
                </pre>

                {/* Username (always at the bottom) */}
                <div className="text-gray-400 text-xs font-extrabold mt-3">Creator @{snippet.username}</div>

                {/* Message */}
                {message && <span className="text-teal-400 mt-2">{message}</span>}

                {/* Delete button */}
                <button
                    onClick={handleDelete}
                    className="text-red-500 text-sm mt-2 w-fit rounded-xl hover:text-red-700 hover:bg-gray-600 cursor-pointer p-2 bg-gray-800 transition-all"
                >
                    Delete
                </button>

            </div>
        </div>
    );
}