import React from 'react'
import { Link } from 'react-router'

export default function Error() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}>
                <h1
                    style={{
                        color: "#fff"
                    }}>Whoopise!, Error Page Not Found</h1>
                
                <Link
                    style={{
                        color: "#000",
                        textDecoration: "none",
                        padding: "1rem",
                        background: "#fff",
                        borderRadius: "10px"
                    }}
                    to={"/"}>Back to login</Link>
            </div>
        </>
    )
}
