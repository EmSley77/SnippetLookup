import React from 'react'
import Header from '../Shared/Header.jsx'
import Footer from '../Shared/Footer.jsx'
import SavedList from './SavedList.jsx'
import { useState, useEffect } from 'react'
import { getSaved } from '../../service/snippet-helper.js'
import { userDetails } from '../../service/user-metadata.js'

export default function Saved() {


    const [snippets, setSnippets] = useState([])

    // get user snippets
    useEffect(() => {
        const fetchSnippets = async () => {

            const params = { userId: userDetails.id }
            const data = await getSaved(params)

            if (data && data.length > 0) {
                setSnippets(data.flat())
            }
        }

        fetchSnippets()
    }, [snippets])

    return (
        <>
            <Header />

            <SavedList data={snippets} />
            <Footer />
        </>
    )
}
