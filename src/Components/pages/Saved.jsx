import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.jsx'
import { removeSaved } from '../../service/posts.js'
import { supabaseClient } from '../../service/supabase.js'
import SavedList from '../saved/SavedList.jsx'
import Header from './Header.jsx'


export default function Saved() {

    const [posts, setPosts] = useState([])
    const { user, loading } = useAuth()

    // get user snippets
    useEffect(() => {

        if (!loading && user) {

            const fetchSnippets = async () => {

                const { data, error } = await supabaseClient.from("saved").select("*").eq("user_id", user.id)

                if (error) {
                    return []
                }

                if (data && data.length > 0) {
                    setPosts(data)
                }
            }
            fetchSnippets()
        }

    }, [user, loading])


    const handleDelete = async (postId) => {
        await removeSaved(user.id, postId)
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
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
