import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getById } from '../../js/data';
import { copyCode } from '../../js/copy';
import { colorGenerator } from '../../js/color';
import checkIcon from '../../assets/check.png'
import copyIcon from '../../assets/copy.png'
import "../../Styles/snippet.css";
import { getSnippetById } from '../../Helper/snippet-helper';

export default function Snippet() {
  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [isCopied, setIsCopied] = useState(false)

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])


  useEffect(() => {
    const fetchById = async () => {
      await getSnippetById(param.snippetid, setSnippet)
    }
    fetchById()
  }, [param.snippetid])


  return (
    <div className="container">
      <div className="snippet-box">
        <h1>{snippet.title}</h1>
        <p className="description">Description: {snippet.description}</p>
        <p className="creator">Creator: {snippet.username}</p>
        <h2 >{snippet.language}</h2>

<hr style={{width:"100%"}}/>
        <div className='code-container'>
            <h2>Code</h2>
          <pre className="code-block">
            <h4>{snippet.code}</h4>
            <button className='copy-code-button' onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
              )}
            </button>
          </pre>
          <hr style={{ width: "50%" }} />

          <div className='snippet-card-like-container'>
            {/* handle like */}
            <button className='like-btn'>

              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
            </button>
            {/* handle dislike */}

            <button className='like-btn'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>
            </button>

          </div>
          <hr style={{ width: "50%", margin: "10px" }} />

        </div>
        <Link className="return-link" to={"/home"}>
          Return
        </Link>
      </div>
    </div>
  );
};

