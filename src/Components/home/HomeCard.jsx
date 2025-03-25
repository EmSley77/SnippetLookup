import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css'
export default function HomeCard({ snippet }) {
  return (

    <div key={snippet.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all hover:translate-y-1.5 ">
      <Link Link to={`/view/${snippet.id}`
      }>
        <p className="text-gray-300 text-sm mb-2">
          {new Date(snippet.created_at).toLocaleDateString()}
        </p>
        <hr className="border-gray-600 mb-6" />

        <div className="flex flex-col mb-6">
          {/* Title */}
          <div className="mb-3 h-10">
            <span className="text-2xl font-semibold uppercase  tracking-wide text-gray-100">
              {snippet.title.toUpperCase()}
            </span>
          </div>

          <hr className="border-teal-500 my-4" />

          {/* Description */}
          <p className="text-gray-100 text-md mb-5 mt-3">
            {snippet.description.toUpperCase()}
          </p>

          {/* Language */}
          <div className="text-sm font-medium mt-3">
            <span className="px-4 py-2 bg-teal-500 text-white font-bold rounded-3xl">
              {snippet.language}
            </span>
          </div>

          {/* Username */}
          <div className="text-gray-100 text-sm font-extrabold  mt-4">
            @{snippet.username}
          </div>
        </div>
      </Link >
    </div>



  );
}

