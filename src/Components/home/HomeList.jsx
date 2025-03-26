import React from 'react'
import HomeCard from './HomeCard.jsx'
import '../../styles/style.css'

export default function HomeList({ data }) {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full text-center">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 tracking-wide">
          Found {data.length} results
        </h2>
      </div>

      {/* If there's data, display it */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg w-full max-w-5xl shadow-lg">
          {data.map((snippet) => (
            <HomeCard
              key={snippet.id}
              snippet={snippet}
              className="hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}