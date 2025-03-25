import React from 'react'
import { Link } from 'react-router'
import '../../styles/style.css'

export default function SessionError() {
    return (
        <>
            <div>
                <h1>You are signed out please sign in or register to continue to use other features</h1>

                <Link to={"/home"}>return</Link>
            </div>
        </>
    )
}
