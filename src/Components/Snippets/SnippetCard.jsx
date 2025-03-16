import React from 'react'
import { colorGenerator } from '../../js/color.js'
export default function SnippetCard({ snippet }) {

  const handleClick = () => {
    console.log("view full page");
    
    
  }
  return (
    <div
    onClick={handleClick}
      className='card'
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

        <span style={{ height: "100px" }}>
          <h1 style={{ flex: 1 }}>{snippet.title}</h1>
        </span>
        <span style={{ height: "100px", color: colorGenerator(), fontSize: "1.5rem" }}>
          <h1 style={{ flex: 1 }}>{snippet.language}</h1>
        </span>
        <span style={{ height: "100px" }}>
          <h2 style={{ flex: 1 }}>Created by: {snippet.user}</h2>
        </span>
      </div>
    </div>
  )
}
