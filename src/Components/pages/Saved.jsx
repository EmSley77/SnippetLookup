import React, { useEffect, useState } from 'react'
import { getSaved } from '../../service/snippets.js'
import { FetchUser } from '../../service/current-user.js'
import SavedList from '../saved/SavedList.jsx'
import Header from './Header.jsx'

export default function Saved() {


    const [snippets, setSnippets] = useState([])
    const { user, loading } = FetchUser()


    // get user snippets
    useEffect(() => {

        if (!loading && user) {

            const fetchSnippets = async () => {

                const params = { userId: user.id }
                const data = await getSaved(params)
                if (!data) return

                setSnippets(data.flat())
            }
            fetchSnippets()
        }

    }, [user, loading])

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
            <SavedList data={snippets} />
        </>
    )
}
