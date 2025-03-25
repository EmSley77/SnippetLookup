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
    <div className='h- p-4 flex justify-center'>

      <div className="flex flex-col gap-6 p-6 bg-gray-900 rounded-xl shadow-lg w-[800px]">

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
