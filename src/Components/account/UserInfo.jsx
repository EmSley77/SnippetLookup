import React from 'react';
import { FaTrash } from 'react-icons/fa';
export default function UserInfo({ user, formatCreatedDate, posts, handleDelete }) {

    if (!user || !posts) {
        return <div>Loading...</div>; // Or a custom loading message
    }

    //TODO: impl delete uploaded snippet 
    return (
        <div className="flex flex-col gap-4 lg:grid-cols-2 p-4 bg-gray-900 rounded-xl shadow-2xl w-full">
            {/* User Info Section */}
            <div className="flex flex-col justify-between p-4 text-white bg-gray-800 rounded-xl shadow-lg">
                <div className="space-y-3 bg-gray-900 p-2 rounded-lg">
                    <hr className="border-gray-600" />
                    <h3 className="text-lg font-bold">@{user?.user_metadata.display_username}</h3>
                    <p className="text-m">{user?.user_metadata.name} {user?.user_metadata.lastname}</p>
                    <p className="text-m"><strong>Preferred language:</strong> {user?.user_metadata.preferred_language}</p>
                    <p className="text-m"><strong>Created account:</strong> {formatCreatedDate(user?.created_at)}</p>
                    <hr className="border-gray-600" />
                </div>
            </div>

            {/* User's Snippets Section */}
            <div className="p-4 rounded-xl text-white">
                <h1 className="text-lg text-center font-medium">My Snippets</h1>
                <hr className="border-teal-500" />
            </div>

            {/* List of Snippets */}
            <div className="flex flex-col gap-10 overflow-y-auto p-3 rounded-xl ">
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-600 flex flex-col items-start">
                            <div className='flex items-center justify-end w-full'>
                                <FaTrash className='cursor-pointer' onClick={() => handleDelete(post.id)} />
                            </div>
                            <div className="flex flex-col mb-3 h-full justify-between">
                                <div className="flex flex-col w-full">
                                    {/* Title */}
                                    <h3 className="text-xl font-semibold tracking-wide text-teal-400 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {post.title}
                                    </h3>

                                    {/* Date */}
                                    <p className="text-gray-300 text-sm">
                                        uploaded {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-teal-300 text-lg text-center">No snippets created yet</h1>
                )}
            </div>
        </div>
    );

};