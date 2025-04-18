import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../service/supabase.js';
import { Link } from 'react-router';
import { FaTrash } from 'react-icons/fa';
export default function SavedCard({ post, handleDelete }) {

    const [postData, setPostData] = useState({})

    //fetch post
    useEffect(() => {

        if (!post || !post.post_id) return; // Prevents running the effect with undefined post.id


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



    return (
        <div className="w-full p-4 bg-white rounded-xl flex flex-col shadow-lg border-6 border-blue-300">

            <h3 className="mb-2 text-lg font-semibold text-blue-800 hover:text-blue-400 transition-all line-clamp-1">
                <Link to={`/view/${postData.id}`}>
                    {postData.title}
                </Link>

            </h3>

            <p className="text-sm text-gray-700 line-clamp-2">
                {postData.description}
            </p>

            <p className="text-xs font-bold mt-3 px-3 py-1 bg-indigo-800 rounded-2xl text-white w-fit">
                Author @{postData.username}
            </p>

            {/* Delete button */}

            <button
                onClick={() => handleDelete(postData.id)}
                className="mt-4 w-full text-red-600 hover:text-red-800 cursor-pointer text-right p-2 transition-all"
            >
                <FaTrash />
            </button>
        </div>
    );
};