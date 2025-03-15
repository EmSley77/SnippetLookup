import React from 'react'

export default function SnippetCard({ snippet, index, snippetIndex, handleCopyButton, isCopied }) {
  return (
    <div
      key={index}
      style={{
        backgroundColor: "#fff",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        padding: "1rem",
        margin: "10px",
        borderRadius: "10px",
        fontFamily: "Fira code",
      }}>
      <h1>{snippet.title}</h1>
      <h2>{snippet.language}</h2>
      <h3>Created by: {snippet.user}</h3>

      <pre
        style={{
          height:"130px",
          overflowY:"scroll",
          fontSize:"1rem",
          fontWeight: "700",
          backgroundColor: "#555",
          padding: "1rem",
          borderRadius: "10px",
          color: "#a6fa6e",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}>{snippet.code}</pre>

      <button
        style={{
          marginTop: "auto"
        }}
        onClick={() => handleCopyButton(snippet.code, index)}>
        {isCopied && index === snippetIndex ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
