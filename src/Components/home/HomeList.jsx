import React from 'react'
import HomeCard from './HomeCard.jsx'
import '../../styles/style.css'

export default function HomeList({ data }) {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-wide">
          Found {data.length} results
        </h2>
      </div>

      {/* if there's data, print it */}
      {data && (
        <div className="flex flex-col gap-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full">
          {data.map((snippet) => (
            <HomeCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
