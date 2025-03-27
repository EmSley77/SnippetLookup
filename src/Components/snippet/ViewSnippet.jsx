import React from 'react';
import { FaCheck, FaCopy, FaHeart } from 'react-icons/fa6';
import '../../styles/style.css';

export default function ViewSnippet({
    snippet,
    handleSaveSnippet,
    isSaved,
    setIsCopied,
    isCopied,
    copyCode,
}) {

    return (<>
        <div className="text-white p-6 flex flex-col justify-between w-full ">

            <h1 className="text-3xl font-bold text-teal-300">{snippet.title}</h1>
            <hr className="mb-3 mt-2 border-gray-600" />
            <p className="text-gray-300 mb-3 mt-3">{snippet.description}</p>
            <h2 className="text-lg font-semibold text-gray-100 mt-2 p-2 bg-purple-500 w-fit rounded-4xl">{snippet.language}</h2>
            <hr className="my-4 border-gray-700" />


            {/* Code Block Section */}
            {snippet.user_text && (
                <>
                    <div className="flex gap-2 justify-around w-full bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-xl p-6">

                    </div>
                    <div className="bg-gray-950 p-4  overflow-x-auto mb-5 shadow-md">

                        <pre className="whitespace-pre-wrap  bg-gray-950 p-3 text-sm">
                            <code>{snippet.user_text}</code>
                        </pre>
                    </div>
                </>
            )}

            {/* Code Block Section */}
            <div className="flex gap-2 justify-around w-full bg-gradient-to-b from-gray-600 to-gray-700 p-2 rounded-t-xl">

                <button className={actionButtonClass}
                    onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>
                    {isCopied ? <FaCheck /> : <FaCopy />}
                </button>

                <button className={actionButtonClass} onClick={handleSaveSnippet}>
                    {isSaved ? <FaCheck /> : <FaHeart />}
                </button>
            </div>
            <div className="bg-gray-950 p-4  overflow-x-auto mb-5 shadow-md">

                <pre className="whitespace-pre-wrap  bg-gray-950 p-3 text-sm">
                    <code>{snippet.code}</code>

                </pre>


            </div>
            <p className="text-gray-400"><strong>Author:</strong> @{snippet.username}</p>
            <p className="text-gray-400"><strong>Date upload: </strong>{new Date(snippet.created_at).toLocaleDateString()}</p>

        </div>
    </>

    );
}

const actionButtonClass = " hover:bg-teal-600 p-2 rounded-lg transition-all cursor-pointer"

/*     Return Button
    <div className="mt-4">
        <Link to="/home" className="block text-center text-white p-3 bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
            Return
        </Link>
    </div> 
    */