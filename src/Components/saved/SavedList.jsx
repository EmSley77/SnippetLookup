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
      <div className='h-full p-4 flex justify-center bg-gray-900'>
        <div className="flex flex-col gap-6 p-6 bg-gray-800 rounded-xl shadow-lg w-[800px]">

          {/* Map through snippets and display each saved card */}
          {data.map((snippet) => (
            <SavedCard
              key={snippet.id}
              snippet={snippet}
            />
          ))}

        </div>
      </div>
    );
  }