import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getById } from '../../js/data';
import { copyCode } from '../../js/copy';
import checkIcon from '../../assets/check.png'
import copyIcon from '../../assets/copy.png'


export default function Snippet() {
  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [isCopied, setIsCopied] = useState(false)

  //retrieve te snippetid from the url params
  console.log(param.snippetid);
  console.log(snippet);

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])


  useEffect(() => {
    const fetchById = async () => {
      const snippet = await getById(param.snippetid)
      setSnippet(snippet)
    }
    fetchById()
  }, [param.snippetid])
  getById()


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <div
        style={{
          color: "#333",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "1px 2px 3px #999",
          width: "800px",
          margin: "2rem",
          padding: "2rem",
          borderRadius: "10px",
        }}>
        <h1>{snippet.title}</h1>
        <h2>{snippet.language}</h2>
        <p style={{fontSize:"1.4rem"}}>Description: {snippet.description}</p>
        <p style={{fontSize:"1.3rem"}}>Creator: {snippet.user}</p>
        <pre
          style={{
            display: "flex",
            flexDirection: "column",
            color: "lightgreen",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            padding: "1.5rem",
            backgroundColor: "#333",
            borderRadius: "10px",
            boxShadow: "1px 4px 5px #777",
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            lineHeight: "1.9rem"


          }}> <h4>{snippet.code}</h4>
          <button onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>{isCopied ? <img
            style={{ height: "30px" }}
            src={checkIcon}
            alt="copy icon"
          /> :
            <img
              src={copyIcon}
              style={{ height: "30px" }}
              alt='check icon'
            />}</button>
        </pre>
        <Link
          style={{
            textDecoration: "none",
            padding: "1rem",
            background: "#fff",
            border: "2px solid #333",
            borderRadius: "10px",
            width:"fit-content"
          }}
          to={"/"}>Return</Link>
      </div>
    </div>
  )
}
