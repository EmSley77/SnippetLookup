import { FaTrash, FaInbox } from "react-icons/fa";
import React from "react";
import UploadedPostCard from "./UploadedPostCard";

export default function UploadedPosts({ posts, handleDelete }) {
    return (
        <div className="flex flex-col shadow-xl h-full bg-white rounded-xl p-6 w-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-lg mb-3 text-center font-semibold text-indigo-700">My Posts</h1>
                <hr className="mb-6" />
            </div>

            {posts?.length > 0 ? (
                <div  className="space-y-4 overflow-y-auto p-2">
                    {posts.map((post) => (
                        <UploadedPostCard post={post} key={post.id} handleDelete={handleDelete} />
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
