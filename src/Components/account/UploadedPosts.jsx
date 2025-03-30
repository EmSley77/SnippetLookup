import { FaTrash } from "react-icons/fa";
import React from "react";

export default function UploadedPosts({ posts, handleDelete }) {
    return (
        <div className="flex flex-col bg-gray-800 rounded-xl p-6 w-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-lg mb-3 text-center font-semibold text-teal-400">My Uploaded Posts</h1>
                <hr className="mb-6"/>
            </div>

            {posts?.length > 0 ? (
                <div className="space-y-4 overflow-y-auto">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="cursor-pointer bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 border border-gray-700 flex flex-col">

                            {/* Delete Icon */}
                            <div className="flex justify-between items-center w-full">
                                <h3 className="text-lg font-semibold text-teal-300 truncate">{post.title}</h3>
                                <FaTrash
                                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                                    onClick={() => handleDelete(post.id)}
                                />
                            </div>

                            {/* Post Date */}
                            <p className="text-gray-400 text-sm mt-1">
                                Uploaded {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center mt-4">No posts available</p>
            )}
        </div>
    );
}
