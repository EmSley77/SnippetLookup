import React from 'react'
import { Link } from 'react-router';
export default function ViewSnippet({
    snippet,
    handleSaveSnippet,
    setIsCopied,
    isCopied,
    message,
    heartIcon,
    likeIcon,
    dislikeIcon,
    checkIcon,
    copyIcon,
    copyCode
}) {
    return (
        <>
            <div className="bg-gray-900 text-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full">
                <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
                <hr className="mb-2 mt-2" />
                <p className="text-gray-300"><strong>Description:</strong> {snippet.description}</p>
                <p className="text-gray-400"><strong>Creator:</strong> @{snippet.username}</p>
                <h2 className="text-lg font-semibold text-gray-300 mt-2">{snippet.language}</h2>

                <hr className="my-4 border-gray-700" />

                {/* Code Block */}
                <div className="bg-gray-700 text-white p-4 rounded-lg overflow-x-auto flex flex-col">
                    <div className='flex justify-between '>
                        <h4 className="mb-2 font-semibold text-gray-200">Code</h4>
                        <button
                            className=" top-2 right-2 bg-gray-600 hover:bg-gray-500 p-2 rounded-lg transition-all"
                            onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}
                        >
                            <img src={isCopied ? checkIcon : copyIcon} alt="copy icon" className="h-6 cursor-pointer" />
                        </button>
                    </div>
                        <hr className="mb-3 mt-4 border-gray-400" />
                    <pre className="whitespace-pre-wrap h-100 overflow-y-auto text-teal-300 drop-shadow-xl bg-gray-800 p-2 rounded-xl">{snippet.code}</pre>

                </div>

                <div className='mt-2 text-center'>

                    <h1 className='text-xl'>Rating</h1>
                </div>
                <hr className="my-4 border-gray-700 w-1/2 mx-auto" />

                {/* Like/Save/Dislike Buttons */}
                <div className="flex justify-center gap-4 bg-gray-700 rounded-xl p-3">
                    <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer">
                        <img src={likeIcon} alt="like icon" className="h-6" />
                    </button>
                    <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer" onClick={handleSaveSnippet}>
                        <img src={heartIcon} alt="save icon" className="h-6" />
                    </button>
                    <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer">
                        <img src={dislikeIcon} alt="dislike icon" className="h-6" />
                    </button>
                </div>

                <hr className="my-4 border-gray-700 w-1/2 mx-auto" />

                {/* Message */}
                {message && <h2 className="text-center text-green-400 font-semibold">{message}</h2>}

                {/* Return Link */}
                <div className="px-2.5 py-1.5 mb-5">
                    <Link to="/home" className="text-white p-2 bg-indigo-500 rounded-xl shadow-lg text-m hover:bg-indigo-700 transition-all">
                        Return
                    </Link>
                </div>
            </div>
        </>
    );
}
