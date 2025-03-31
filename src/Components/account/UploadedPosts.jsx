import { FaTrash, FaInbox } from "react-icons/fa";
import React from "react";

export default function UploadedPosts({ posts, handleDelete }) {
    return (
        <div className="flex flex-col shadow-xl h-full bg-white rounded-xl p-6 w-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-lg mb-3 text-center font-semibold text-indigo-700">My Posts</h1>
                <hr className="mb-6" />
            </div>

            {posts?.length > 0 ? (
                <div className="space-y-4 overflow-y-auto p-2">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] flex flex-col gap-2">

                            {/* Header with Delete Icon */}
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-indigo-500 truncate">{post.title}</h3>
                                <FaTrash
                                    className="cursor-pointer text-gray-500 hover:text-red-500 transition-all"
                                    onClick={() => handleDelete(post.id)}
                                />
                            </div>

                            {/* Post Date */}
                            <p className="text-gray-700 text-sm">
                                Uploaded on {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 mt-6">
                    <FaInbox size={32} />
                    <p className="mt-2">No posts available</p>
                </div>
            )}
        </div>
    );
}
