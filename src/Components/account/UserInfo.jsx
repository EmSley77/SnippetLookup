import React from 'react'
export default function UserInfo({ user, formatCreatedDate, snippets }) {
    return (
        <div className="flex flex-col gap-4 lg:grid-cols-2 p-4 bg-gray-900 rounded-xl shadow-2xl w-1/3">

            {/* User Info Section */}
            <div className="flex flex-col justify-between p-4 text-white bg-gray-800 rounded-xl shadow-lg">
                <div className="space-y-3">
                    <hr className="border-gray-600" />
                    <h3 className="text-lg font-bold">@{user.user_metadata.display_username}</h3>
                    <p className="text-m">{user.user_metadata.name} {user.user_metadata.lastname}</p>
                    <p className="text-m"><strong>Preferred language:</strong> {user.user_metadata.preferred_language}</p>
                    <p className="text-m"><strong>Created account:</strong> {formatCreatedDate(user.created_at)}</p>
                    <hr className="border-gray-600" />
                </div>
            </div>

            {/* User's Snippets Section */}
            <div className="text-center bg-gray-800 p-4 rounded-xl shadow-md text-white">
                <h1 className="text-lg font-medium">My Snippets</h1>
                <hr className="border-teal-500" />
            </div>

            {/* List of Snippets */}
            <div className="flex flex-col gap-10 overflow-y-auto bg-gray-800 p-3 rounded-xl">
                {snippets && snippets.length > 0 ? snippets.map((snippet) => (
                    <div key={snippet.id} className="p-4 bg-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all">
                        <div className="flex flex-col mb-3 h-full justify-between">
                            {/* Title */}
                            <div>
                                <span className="text-lg font-semibold uppercase tracking-wide text-teal-300">
                                    {snippet.title.toUpperCase()}
                                </span>
                            </div>

                            <hr className="border-teal-500 my-2" />

                            {/* Description */}
                            <p className="text-gray-300 text-m mb-5 mt-3">{snippet.description.toUpperCase()}</p>

                            {/* Language */}
                            <div className="text-sm font-medium mt-auto">
                                <span className="px-2 py-2 bg-teal-400 text-white font-bold rounded-2xl">
                                    {snippet.language}
                                </span>
                            </div>

                            {/* Code block */}
                            <pre className="bg-gray-800 p-3 text-teal-300 rounded-xl mt-5 whitespace-pre-wrap break-words overflow-y-auto max-h-40">
                                {snippet.code}
                            </pre>

                            {/* Username */}
                            <div className="text-teal-300 text-s font-extrabold mt-3">@{snippet.username}</div>
                        </div>
                    </div>
                )) : <h1 className="text-teal-300 text-lg">No snippets created yet</h1>}
            </div>
        </div>
    );
};