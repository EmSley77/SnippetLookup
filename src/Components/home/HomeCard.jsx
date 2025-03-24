import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css'
export default function HomeCard({ snippet }) {
  return (

    <article className="rounded-xl border border-gray-200 bg-white px-6 pt-8 pb-6 dark:border-gray-700 dark:bg-gray-800 w-full flex flex-col justify-between hover:translate-y-2.5 transition-all cursor-pointer">
      {/* Title */}

      {/* Date */}
      <time  className="block text-gray-500 dark:text-gray-400 mb-4 text-xl">
        uploaded {new Date(snippet.created_at).toLocaleString()}
      </time>
      <hr className='mb-3 text-teal-200'/>
      <h1 className="text-white mb-4 text-xl font-semibold">{snippet.title}</h1>

      {/* Description with Link */}
      <Link to={`/view/${snippet.id}`}>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 transition duration-200">
          {snippet.description}
        </h3>
      </Link>

      {/* Language Tag */}
      <div className="mt-4">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
          {snippet.language}
        </span>
      </div>

      <hr className='mt-3 text-teal-200'/>
  

      {/* Username */}
      <div className="mt-4">
        <span className="rounded-full bg-gray-700 text-white py-1 px-3 text-sm">
          @{snippet.username}
        </span>
      </div>
    </article>


  );
}


/* 



*/