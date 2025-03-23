import React from 'react'
import HomeCard from './HomeCard.jsx'
import '../../styles/style.css'

export default function HomeList({ data }) {
  return (
    <div className="p-4">

      <div className='w-full items-center justify-center p-3 text-center '>
        <h2 className='text-3xl font-bold text-gray-500 mb-3'>found {data.length} snippets</h2>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-white text-lg">No snippets found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow-2xl justify-center p-10 rounded-xl" >
          {data.map((snippet) => (
            <HomeCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
