import React from 'react'
import '../../styles/style.css'

export default function CommentCard({item, id}) {
    return (
        <div key={id} className="border border-gray-700 rounded-lg p-4 ml-3 my-3 bg-gray-800 shadow-md">
            
            <div className="flex justify-between items-center mb-2">
                <p className="text-cyan-200 font-semibold">
                    {item.username ? `@${item.username}` : "@Anonymous"}
                </p>
                <span className="text-gray-400 text-sm">
                    {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                </span>
            </div>
            <hr className="border-gray-600" />
            <p className="mt-3 text-gray-300">{item.comment}</p>
        </div>
    );
};
