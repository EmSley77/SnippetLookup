import React from 'react'
import SnippetCard from './SnippetCard.jsx'

export default function SnippetList({ data, snippetId, isCopied }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto"
      }}>

      <div
        style={{
          marginTop: "3em",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}>

        {data.map((snippet, index) => (
          <SnippetCard
          key={index}
            snippetId={snippetId}
            isCopied={isCopied}
            snippet={snippet}
          />
        ))}
      </div>
    </div>
  )
}
