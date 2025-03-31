import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../service/supabase.js';
import { Link } from 'react-router';
export default function SavedCard({ post, handleDelete }) {

    const [postData, setPostData] = useState({})
    console.log(post);


    //fetch post
    useEffect(() => {

        if (!post || !post.id) return; // Prevents running the effect with undefined post.id


        const fetchPostData = async () => {
            const { data, error } = await supabaseClient.from("posts").select("*").eq("id", post.post_id)

            if (error) {
                return [];
            }

            if (data) {
                setPostData(data[0])
                return
            }
        }
        fetchPostData()

    }, [post])


    //TODO: currently not incrementing view when viewing from saved
    return (
        <div className="p-6 bg-white rounded-xl shadow-md transition-all">
            <div className="flex flex-col space-y-4">
                {/* Title */}
                <h1 className="text-xl font-semibold text-gray-900">{postData.title}</h1>

                {/* Description */}
                <p className="text-indigo-700">{postData.description}</p>

                {/* Creator & Date Info */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Creator:</strong> @{postData.username}</p>
                    <p><strong>Created:</strong> {new Date(postData.created_at).toLocaleDateString()}</p>
                </div>

                {/* View Button */}
                <Link
                    to={`/view/${postData.id}`}
                    className="px-4 py-2 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-600 transition"
                >
                    View
                </Link>

                {/* Delete button */}
                <button
                    onClick={() => handleDelete(post.post_id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};