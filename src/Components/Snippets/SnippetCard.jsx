import React from 'react'

export default function SnippetCard({snippet, index, snippetIndex, handleCopyButton, isCopied}) {
  return (
    <div key={index}>
      <h1>{snippet.title}</h1>
      <h2>Language: {snippet.language}</h2>
      <h3>Created by: {snippet.user}</h3>
      <div>
        <pre>{snippet.code}</pre>
      </div>
      <button onClick={() => handleCopyButton(snippet.code, index)}>
        {isCopied && index === snippetIndex ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
