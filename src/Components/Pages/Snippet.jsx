import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getSnippetById, saveSnippet } from '../../Helper/snippet-helper';
import { copyCode } from '../../js/copy';
import { userDetails } from '../../Helper/user-metadata.js'
import heartIcon from '../../assets/heart.png'
import likeIcon from '../../assets/thumb up.png'
import dislikeIcon from '../../assets/thumbs down.png'
import copyIcon from '../../assets/copy white.png'
import checkIcon from '../../assets/check white.png'

import "../../Styles/snippet.css";

export default function Snippet() {

  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)


  useEffect(() => {
    const fetchById = async () => {
      await getSnippetById(param.snippetid, setSnippet)
    }
    fetchById()
  }, [param.snippetid])

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setMessage('')
      return () => clearTimeout(messageTimer)
    }, 3000)
  }, [message])

  const handleSaveSnippet = async () => {
    const params = {
      setMessage: setMessage,
      snippetId: snippet.id,
      userId: userDetails.id
    }
    await saveSnippet(params)
  }


  return (
    <div className="container">
      <div className="snippet-box">
        <h1>{snippet.title}</h1>
        <p className="description">Description: {snippet.description}</p>
        <p className="creator">Creator: {snippet.username}</p>
        <h2 >{snippet.language}</h2>

        <hr style={{ width: "100%" }} />
        <div className='code-container'>
          <h2>Code</h2>
          <pre className="code-block">
            <h4>{snippet.code}</h4>
            <button className='copy-code-button' onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>
              {isCopied ? (
                <img src={checkIcon} alt="check icon" height={"24px"} />

              ) : (
                <img src={copyIcon} alt="copy icon" height={"24px"} />
              )}
            </button>
          </pre>
          <hr style={{ width: "50%" }} />

          <div className='snippet-card-like-container'>
            {/* handle like */}
            <button className='like-btn'>

              <img src={likeIcon} alt="like icon" height={"24px"} />
            </button>
            {/* handle saved */}
            <button className='like-btn' onClick={handleSaveSnippet}>

              <img src={heartIcon} alt="heart icon" height={"24px"} />
            </button>
            {/* handle dislike */}
            <button className='like-btn'>
              <img src={dislikeIcon} alt="dislike icon" height={"24px"} />
            </button>

          </div>
          <hr style={{ width: "50%", margin: "10px" }} />

          {message && <span><h2>{message}</h2></span>}

        </div>
        <Link className="return-link" to={"/home"}>
          Return
        </Link>
      </div>
    </div>
  );
};

