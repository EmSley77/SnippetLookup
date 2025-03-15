import React from 'react'
import SnippetCard from './SnippetCard.jsx'

export default function SnippetList({ data, snippetIndex, handleCopyButton, isCopied }) {
  return (
    <>
      {data.map((snippet, index) => (
        <SnippetCard
        isCopied={isCopied}
          snippet={snippet}
          index={index}
          snippetIndex={snippetIndex}
          handleCopyButton={handleCopyButton}
        />
      ))}
    </>
  )
}
