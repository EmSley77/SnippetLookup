import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../service/supabase.js';
export default function SavedCard({ savedPost, handleDelete }) {

    const [postData, setPostData] = useState({})



    //fetch post
    useEffect(() => {

        if (!savedPost || !savedPost.id) return; // Prevents running the effect with undefined post.id


        const fetchPostData = async () => {
            const { data, error } = await supabaseClient.from("posts").select("*").eq("id", savedPost.post_id)

            if (error) {
                return [];
            }

            if (data) {
                setPostData(data[0])
                return
            }
        }
        fetchPostData()

    }, [savedPost])




    return (
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all text-white">
            <div className="flex flex-col justify-between space-y-3">
                <h1 className="text-xl font-semibold text-teal-300">{postData.title}</h1>
                <p className="text-gray-300">{postData.description}</p>

                <div className="text-sm text-gray-400">
                    <p><strong>Creator:</strong> @{postData.username}</p>
                    <p><strong>Created:</strong> {new Date(postData.created_at).toLocaleDateString()}</p>
                </div>

                {/* Delete button */}
                <button
                    onClick={() => handleDelete(savedPost.post_id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};