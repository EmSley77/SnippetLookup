import React, { useEffect, useState } from 'react'
import { getSaved } from '../../service/snippet-helper.js'
import { FetchUser } from '../../service/user-metadata.js'
import { Link } from 'react-router'
import Header from '../Shared/Header.jsx'
import LoaderTeal from '../util/LoaderTeal.jsx'
import SavedList from './SavedList.jsx'

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
