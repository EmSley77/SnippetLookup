import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.jsx';
import usePosts from '../../hooks/usePosts.jsx';
import '../../styles/style.css';
import UploadedPosts from '../account/UploadedPosts.jsx';
import BarChart from '../chart/BarChart.jsx';
import Header from './Header.jsx';
import { supabaseClient } from "../../service/supabase.js";

export default function Account() {

    const [posts, setPosts] = useState([])

    const { user, loading } = useAuth()
    const { getPostsByUserId } = usePosts()

    //delete post
    async function deletePost(postId) {
        const { data, error } = await supabaseClient
            .from("posts")
            .delete()
            .eq("id", postId)
            .eq("user_id", user.id).single();

        if (error) {
            return false;
        }

        if (data) {
            return true;
        }
    }

    const handleDelete = useCallback(async (postId) => {
        try {
            const isDeleted = await deletePost(postId);

            if (isDeleted) {
                setPosts(posts.filter(post => post.id !== postId));
            }
        } catch (error) {
            console.error("Could not delete post", error);
        }
    }, [user]);


    const fetchPosts = useCallback(async () => {
        if (!user) return;

        try {
            const data = await getPostsByUserId(user.id);
            if (data) {
                setPosts(data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])


    if (loading) {
        return <>
            <h1>Loading...</h1>
        </>
    }

    return (
        <>
            <Header />
            <div className="p-6 max-w-6xl mx-auto">
                {/* User Info Section */}
                <div
                    className="bg-blue-100  p-6 rounded-xl shadow-xl text-gray-500 w-full mb-6 flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-blue-900">{user.user_metadata.name} {user.user_metadata.lastname}</h1>
                    <p className="text-lg">Member
                        since {new Date(user?.created_at).toLocaleDateString()}</p>
                    <p className="text-md ">Preferred
                        language: {user?.user_metadata.preferred_language}</p>
                    <p className="text-md">@{user?.user_metadata.display_username}</p>
                </div>

                {/* Dashboard Content */}
                <div className="flex flex-col lg:grid-cols-2 gap-3 ">

                    {/* Posted blogs */}
                    <UploadedPosts
                        posts={posts}
                        handleDelete={handleDelete}
                    />

                    {/* Stats Chart */}
                    <BarChart />

                </div>
            </div>
        </>
    );
}
