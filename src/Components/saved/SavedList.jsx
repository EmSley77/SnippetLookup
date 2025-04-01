import React from 'react'
import { Link } from 'react-router'
import '../../styles/style.css'
import LoaderTeal from '../helper/loaders/LoaderTeal.jsx'
import SavedCard from './SavedCard.jsx'

export default function SavedList({ data, handleDelete }) {


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
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-lg w-full max-w-7xl ">

      {/* Map through snippets and display each saved card */}
      {data.map((post) => (
        <div key={post.id}>

          <SavedCard
            post={post}
            handleDelete={handleDelete}
          />


        </div>
      ))}

    </div>

  );
}