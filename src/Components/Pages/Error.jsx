import React from 'react'
import { Link } from 'react-router'

export default function Error() {
    return (
        <>
            <div>
                <h1 style={{color:"#fff"}}>Error Page Not Found</h1>
                <Link style={{color:"#000", textDecoration:"none", padding:"1rem", background:"#fff", borderRadius:"10px"}} to={"/"}>Return home</Link>
            </div>
        </>
    )
}
