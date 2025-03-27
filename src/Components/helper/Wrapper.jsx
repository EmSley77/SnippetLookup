import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { supabaseClient } from '../../service/supabase.js'


export default function Wrapper({ children }) {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    //This wrapper is for when a user does not have a active/ authienticated session then all pages/children are requested will be redirected to login if no session is there, but if tehre is a session return the page/ children
    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession()

            setAuthenticated(!!session) // force to either true or false
            setLoading(false)
        }
        getSession()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    } else if (authenticated) {
        return <>{children}</> 
    }
    return (
        <>
            <Navigate to={"/"} />
        </>
    )
}