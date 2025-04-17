import React from 'react'
import '../../styles/style.css'
import {FaTrash} from 'react-icons/fa'

export default function UploadedPostCard({post, handleDelete}) {
    return (
        <div className="space-y-4  p-2">
            <div

                className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:translate-y-2 flex flex-col gap-2">

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
                    Posted {new Date(post.created_at).toLocaleDateString()}
                </p>
            </div>

        </div>
    )
}
