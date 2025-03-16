import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getById } from '../../js/data';
import { copyCode } from '../../js/copy';


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
          height: "800px",
          margin: "2rem",
          padding: "2rem",
          borderRadius: "10px",
        }}>
        <h1>{snippet.title}</h1>
        <h1>Description: {snippet.description}</h1>
        <h1 >Creator: {snippet.user}</h1>
        <pre
          style={{
            color: "lightgreen",
            padding: "2rem",
            backgroundColor: "#333",
            borderRadius: "10px",
            boxShadow: "1px 4px 5px #777",

          }}> <h2>{snippet.code}</h2>
          <button onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>{isCopied ? "Copied" : "Copy"}</button>
        </pre>
      </div>
    </div>
  )
}
