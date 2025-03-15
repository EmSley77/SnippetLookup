import React from 'react'
import SnippetCard from './SnippetCard.jsx'

export default function SnippetList({ data, snippetIndex, handleCopyButton, isCopied }) {
  return (
    <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        maxWidth: "1000px",
        margin:"0 auto"
      }}>

      <div
        style={{
          marginTop:"3em",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}>
        {data.map((snippet, index) => (
          <SnippetCard
            isCopied={isCopied}
            snippet={snippet}
            index={index}
            snippetIndex={snippetIndex}
            handleCopyButton={handleCopyButton}
          />
        ))}
      </div>
    </div>
  )
}
