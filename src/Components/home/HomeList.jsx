import React from 'react'
import HomeCard from './HomeCard.jsx'
import '../../styles/style.css'

export default function HomeList({ data }) {
  return (
    <div className="p-6 ">

      <div className="w-full items-center justify-center p-3 text-center">
        <h2 className="text-4xl font-semibold text-gray-100 mb-5 tracking-wide">Found {data.length} snippets</h2>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-white text-lg mt-8">No snippets found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center p-8 rounded-xl bg-gray-900 shadow-xl">
          {data.map((snippet) => (
            <HomeCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}