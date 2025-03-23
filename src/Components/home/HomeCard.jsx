import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css'
export default function HomeCard({ snippet }) {
  return (
    <Link
      to={`/view/${snippet.id}`}
      className="block p-4 bg-gray-900 rounded-lg shadow-xl hover:shadow-xl transform hover:scale-102 transition-all"
    >
      <div className="flex flex-col h-full justify-between">

        {/* Title */}
        <div className='h-full'>
          <span className="text-lg font-semibold uppercase tracking-wide text-gray-100">
            {snippet.title}
          </span>
        </div>

        <hr className="border-teal-500 my-2" />

        {/* Description */}
        <p className="text-gray-100 text-m mb-5 mt-3">{snippet.description}</p>

        {/* Language */}
        <div className="text-sm font-medium mt-auto">
          <span className="px-2 py-2 bg-teal-400 text-white font-bold rounded-2xl ">
            {snippet.language}
          </span>
        </div>

        {/* Username (always at the bottom) */}
        <div className="text-gray-100 text-xs font-extrabold mt-3">@{snippet.username}</div>
      </div>
    </Link>

  );
}