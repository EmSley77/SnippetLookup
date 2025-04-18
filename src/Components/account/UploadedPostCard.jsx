import React from 'react'
import { FaTrash } from 'react-icons/fa'
import '../../styles/style.css'

export default function UploadedPostCard({ post, handleDelete }) {
    return (
        <div className="space-y-4  p-2">
            <div
                className="bg-blue-100 p-4 rounded-lg shadow-md outline-1 hover:shadow-lg transition-all transform hover:translate-y-0.5 flex flex-col gap-2">

                {/* Header with Delete Icon */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-black truncate">{post.title}</h3>
                    <FaTrash
                        className="cursor-pointer text-red-600 hover:text-red-800 transition-all"
                        onClick={() => handleDelete(post.id)}
                    />
                </div>
            </div>

        </div>
    )
}
