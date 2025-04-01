import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../service/supabase.js';
import { Link } from 'react-router';
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
        <div className="w-full p-4 bg-white rounded-xl flex flex-col shadow-lg">


            <div className="mb-4 overflow-hidden rounded-lg w-full h-48 flex justify-center items-center bg-gray-800">
                <img src={postData.image} alt={postData.title} className="w-full h-full object-cover" />
            </div>


            {postData.created_at && (
                <span className="mb-3 inline-block rounded bg-indigo-800 px-3 py-1 text-xs font-semibold text-white w-fit">
                    {new Date(postData.created_at).toLocaleDateString()}
                </span>
            )}

            <h3 className="mb-2 text-lg font-semibold text-indigo-700 hover:text-indigo-400 transition-all line-clamp-1">
                <Link to={`/view/${postData.id}`}>
                    {postData.title}
                </Link>

            </h3>

            <p className="text-sm text-gray-700 line-clamp-2">
                {postData.description}
            </p>

            <p className="text-xs font-bold mt-3 px-3 py-1 bg-indigo-800 rounded-2xl text-white w-fit">
                @{postData.username}
            </p>

            {/* Delete button */}

            <button
                onClick={() => handleDelete(postData.id)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all"
            >
                Delete
            </button>
        </div>
    );
};