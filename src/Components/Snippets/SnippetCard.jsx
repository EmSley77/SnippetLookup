import React from 'react'

export default function SnippetCard({ snippet, snippetId, handleCopyButton, isCopied }) {
  return (
    <div
      key={snippet.id}
      style={{
        width: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fff", // Lighter contrast
        border: "2px solid #5a5e7a", // Soft border for definition
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)", // Stronger shadow for depth
        color: "#333", // Slightly off-white for readability
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>

        <span style={{height:"100px"}}>
          <h1 style={{ flex: 1 }}>{snippet.title}</h1>
        </span>
        <span style={{height:"100px"}}>
          <h1 style={{ flex: 1 }}>{snippet.language}</h1>
        </span>
        <span style={{height:"100px"}}>
          <h2 style={{ flex: 1 }}>Created by: {snippet.user}</h2>
        </span>
      </div>

      {/*       <pre
        style={{
          height: "130px",
          overflowY: "scroll",
          fontSize: "1rem",
          fontWeight: "700",
          backgroundColor: "#555",
          padding: "1rem",
          borderRadius: "10px",
          color: "#a6fa6e",
          textShadow: "1px 3px 4px #222",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}>{snippet.code}</pre> */}

      <button
        style={{
          marginTop: "auto"
        }}
        onClick={() => handleCopyButton(snippet)}>
        {isCopied && snippetId === snippet.id ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
