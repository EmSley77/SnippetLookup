import React from 'react';
import Bar from '../chart/Bar.jsx'
import UploadedPosts from './UploadedPosts.jsx';
export default function UserInfo({ user, formatCreatedDate, posts, handleDelete }) {

    if (!user || !posts) {
        return <div>Loading...</div>; // Or a custom loading message
    }

    //TODO: impl delete uploaded snippet 
    return (
        <div className="p-6 space-y-6">
            {/* User Info Section */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white text-center">
                <h1 className="text-4xl font-bold text-teal-400">
                    WELCOME BACK, {user.user_metadata.name} {user.user_metadata.lastname}
                </h1>
                <p className="text-lg text-gray-300">Member since {formatCreatedDate(user?.created_at)}</p>
                <p className="text-md text-gray-400">Preferred language: {user?.user_metadata.preferred_language}</p>
                <p className="text-md text-gray-500">@{user?.user_metadata.display_username}</p>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stats Chart */}
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-teal-400 mb-3 text-center">Statistics</h2>
                    <hr />
                    <Bar />
                </div>

                {/* Uploaded Posts */}
                <UploadedPosts posts={posts} handleDelete={handleDelete} />
            </div>
        </div>
    );
}