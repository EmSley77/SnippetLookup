import React, { useCallback, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.jsx'
import usePosts from '../../hooks/usePosts.jsx';
import { supabaseClient } from '../../service/supabase.js'
import SavedList from '../saved/SavedList.jsx'
import Header from './Header.jsx'


export default function Saved() {

    const [posts, setPosts] = useState([])
    const { user, loading } = useAuth()
    const { deleteSaved } = usePosts()

    const fetchPosts = useCallback(async () => {

        if (user) {

            const { data, error } = await supabaseClient.from("saved").select("*").eq("user_id", user.id)

            if (error) {
                return []
            }

            if (data && data.length > 0) {
                setPosts(data)
            }

        }
    }, [user])
    // get user snippets
    useEffect(() => {

        fetchPosts()

    }, [fetchPosts])


    const handleDelete = async (postId) => {
        await deleteSaved(user.id, postId)
        const updatedPosts = posts.filter(savedPost => savedPost.post_id !== postId);
        setPosts(updatedPosts);
        alert("post has been removed")
    }

    if (loading) {
        return (
            <>
                <div className='flex flex-col h-screen justify-center items-center'>
                    <h1 className='text-white text-center text-2xl'>Loading in user data</h1>
                </div>
            </>
        )

    }

    return (
        <>
            <Header />
            <SavedList
                data={posts}
                handleDelete={handleDelete}
            />
        </>
    )
}
