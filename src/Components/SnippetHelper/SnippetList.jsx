import React from 'react'
import SnippetCard from './SnippetCard.jsx'

export default function SnippetList({ data }) {
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
          gap:"2rem",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}>

        {data.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
          />
        ))}
      </div>
    </div>
  )
}
