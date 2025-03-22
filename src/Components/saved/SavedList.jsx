import React from 'react'
import SavedCard from './SavedCard.jsx'

export default function SavedList({data}) {
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
          <SavedCard
            key={snippet.id}
            snippet={snippet}
          />
        ))}
      </div>
    </div>
  )
}
