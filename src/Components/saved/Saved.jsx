import React from 'react'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import SavedList from './SavedList.jsx'
import { useState, useEffect } from 'react'
import { getSaved } from '../../service/snippet-helper.js'
import { FetchUser } from '../../service/user-metadata.js'

export default function Saved() {


    const [snippets, setSnippets] = useState([])
    const { user, loading } = FetchUser()


    // get user snippets
    useEffect(() => {
        if (!loading && user) {

            const fetchSnippets = async () => {

                const params = { userId: user.id }
                const data = await getSaved(params)

                if (data && data.length > 0) {
                    setSnippets(data.flat())
                }
            }
            fetchSnippets()
        }

    }, [user, loading])



    

    if (loading) return <><h1>Loading...</h1></>

    return (
        <>
            <Header />

            <SavedList data={snippets} />
        </>
    )
}
