import React, { useEffect, useState } from 'react';
import { copyCode } from '../../js/copy';
import { removeSaved } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';

export default function SavedCard({ snippet }) {

    const [isCopied, setIsCopied] = useState(false)
    const [message, setMessage] = useState('')

    const { user, loading } = FetchUser()




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
        <div className="block p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-102 transition-all">
            < div className="flex flex-col h-full justify-between">

                {/* Title */}
                <div className="h-full">
                    <span className="text-lg font-semibold uppercase tracking-wide text-gray-900">
                        {snippet.title.toUpperCase()}
                    </span>
                </div>

                <hr className="border-teal-500 my-2" />

                {/* Description */}
                <p className="text-gray-900 text-sm mb-5 mt-3">{snippet.description.toUpperCase()}</p>

                {/* Language */}
                <div className="text-sm font-medium mt-auto">
                    <span className="px-2 py-2 bg-teal-400 text-white font-bold rounded-2xl">
                        {snippet.language}
                    </span>
                </div>

                {/* Code block */}


                <pre onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}
                    className='drop-shadow-lg bg-gray-400 p-3  rounded-xl mt-4 whitespace-pre-wrap break-words overflow-y-scroll h-full scroll-smooth cursor-pointer'>

                    {snippet.code}
                </pre>


                {/* Username (always at the bottom) */}
                <div className="text-gray-900 text-xs font-extrabold mt-3">Creator @{snippet.username}</div>

                {/* Message */}
                {message && <span className="text-teal-400 mt-2">{message}</span>}

                {/* Delete button */}
                <button
                    onClick={handleDelete}
                    className="text-red-500 text-sm mt-2 w-fit rounded-xl hover:text-red-700 hover:bg-gray-200 cursor-pointer p-2 bg-gray-100 transition-all"
                >
                    Delete
                </button>

            </div>
        </div >
    );
};