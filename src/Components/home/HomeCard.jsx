import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css'


export default function HomeCard({ snippet }) {
  return (
    <div
      key={snippet.id}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-200"
    >
      <Link to={`/view/${snippet.id}`} className="block">


        <div className="flex flex-col">
          {/* Title */}
          <h3 className="text-2xl font-semibold tracking-wide text-gray-900 mb-2 h-15">
            {snippet.title}
          </h3>
          <hr className="border-gray-300 mb-4" />


          {/* Description */}
          <p className="text-gray-700 text-md mb-4">{snippet.description}</p>

          {/* Language Badge */}
          <div className="mt-2">
            <span className="px-4 py-1 bg-teal-600 text-white font-semibold rounded-3xl text-sm">
              {snippet.language}
            </span>
          </div>

          {/* Username */}
          <p className="text-gray-600 text-sm font-bold mt-4">
            @{snippet.username}
          </p>
        </div>
      </Link>
    </div>
  );
}