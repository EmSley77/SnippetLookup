import React from 'react';
import '../../styles/style.css';

export default function CommentCard({ comment }) {
    return (
        <div key={comment.id} className="border border-gray-300 rounded-lg p-4 ml-3 my-3 bg-white shadow-lg">

            <div className="flex flex-col justify-between mb-4">
                <p className="text-indigo-800 font-semibold">
                    {comment.username ? `@${comment.username}` : "@Anonymous"}
                </p>
                <span className="text-gray-700 text-xs">
                    {new Date(comment.created_at).toLocaleDateString()} {new Date(comment.created_at).toLocaleTimeString()}
                </span>
            </div>
            <p className="mt-3 text-gray-700">{comment.comment}</p>
        </div>
    );
};
