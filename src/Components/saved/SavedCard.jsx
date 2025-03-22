import React, { useEffect, useState } from 'react';
import { copyCode } from '../../js/copy';
import { removeSaved } from '../../service/snippet-helper.js'
import { userDetails } from '../../service/user-metadata.js'
import '../../styles/savedcard.css';

export default function SavedCard({ snippet }) {

    const [isCopied, setIsCopied] = useState(false)
    const [message, setMessage] = useState('')


    useEffect(() => {
        if (isCopied) {
            setMessage("Copied code")
            const timer = setTimeout(() => {
                setIsCopied(false)
                setMessage('')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isCopied])


    const handleDelete = async () => {

        const params = {
            userId: userDetails.id,
            snippetId: snippet.id,
        }

        await removeSaved(params)
    }


    return (

        <div className="card">

            <div className="main-content">
                <div className="header">
                    <span className="title">{snippet.title.toUpperCase()}</span>
                </div>
                <p className="description">{snippet.description.toUpperCase()}</p>
                <div className="categories">
                    <span className="category">{snippet.language}</span>
                </div>
                <pre className="code" onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>
                    {snippet.code}
                </pre>

                {message && <span>{message}</span>}
            </div>
            <div className="card-footer">
                <span>@{snippet.username}</span>
            </div>
            <button onClick={handleDelete}
                style={{
                    padding: "10px",
                    width: "fit-content",
                    background: "var(--bg-dark)",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                delete
            </button>
        </div>



    );
}