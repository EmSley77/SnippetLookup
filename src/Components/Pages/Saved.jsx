import React from 'react'
import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import SnippetList from '../SnippetHelper/SnippetList.jsx'
import { useState, useEffect } from 'react'
import { getSaved } from '../../Helper/snippet-helper'
import { userDetails } from '../../Helper/user-metadata.js'
export default function Saved() {


    const [snippets, setSnippets] = useState([])
    const [savedSnippets, setSavedSnippets] = useState([])

    const [message, setMessage] = useState('')


    // get user snippets
    useEffect(() => {
        const fetchSnippets = async () => {

            const params = { userId: userDetails.id }            
            const data = await getSaved(params)
            
            if (data && data.length > 0) {
                console.log(data.flat());
                setSnippets(data.flat())
            }
        }

        fetchSnippets()
    }, [])

    console.log(snippets);



    return (
        <>
            <Header />
            <div>
                {savedSnippets && savedSnippets.length > 0 ? <SnippetList data={savedSnippets} /> : <h2>No Snippets saved available</h2>}
            </div>
            <Footer />
        </>
    )
}
