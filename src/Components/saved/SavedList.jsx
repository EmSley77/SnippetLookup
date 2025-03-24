import React from 'react'
import SavedCard from './SavedCard.jsx'
import '../../styles/style.css'

export default function SavedList({ data }) {

  if (data.length === 0) {
    return (
      <div>
        <h1>No Saved snippets</h1>
      </div>
    )
  }
  return (
    <div className='h-screen p-4'>

      <div className='grid grid-cols-3 gap-2 p-3 bg-gray-900 rounded-xl shadow-lg'>

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
