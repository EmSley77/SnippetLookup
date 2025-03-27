import React from 'react'
import SavedCard from './SavedCard.jsx'
import { Link } from 'react-router'
import '../../styles/style.css'
import LoaderTeal from '../helper/loaders/LoaderTeal.jsx'

export default function SavedList({ data }) {

  if (data.length === 0) {
    return (
      <>
        <div className='flex flex-col h-screen justify-center items-center'>

          <h1 className='text-white text-center text-2xl'>No saved snippets</h1>

          < LoaderTeal />

          <Link to={"/"} className='text-white p-6 py-2 bg-gray-800 mt-6 rounded-xl transition-all hover:bg-gray-700'>home</Link>
        </div>
      </>
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