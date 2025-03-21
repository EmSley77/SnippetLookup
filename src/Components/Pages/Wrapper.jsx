import React, { useEffect, useState } from 'react'
import { supabaseClient } from '../../Helper/supabase-helper.js'
import { Navigate } from 'react-router'
export default function Wrapper({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession()
            //!!null -> false
            //!!{} -> true
            setAuthenticated(!!session)
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
        <Navigate to={"/"} />
    )
}
