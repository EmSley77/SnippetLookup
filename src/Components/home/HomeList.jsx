import React from 'react'
import HomeCard from './HomeCard.jsx'

export default function HomeList({ data }) {
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
          <HomeCard
            key={snippet.id}
            snippet={snippet}
          />
        ))}
      </div>
    </div>
  )
}
