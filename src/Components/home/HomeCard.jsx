import React from 'react';
import { Link } from 'react-router';
import useAnon from '../../hooks/useAnon.jsx'
import '../../styles/style.css';

export default function HomeCard({ snippet }) {

  const { getSnippetViews, updateSnippetViewCount } = useAnon();

  const handleCardClick = async () => {


    if (!snippet?.id) {
      console.log("Snippet ID is missing");
      return
    }

    const currentViews = await getSnippetViews(snippet.id);
    const updatedCount = (currentViews || 0) + 1
    await updateSnippetViewCount(updatedCount, snippet?.id)
  }


  return (
    <div
      key={snippet.id}
      className="p-6 bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-700 flex flex-col items-start"
    >
      <Link onClick={handleCardClick} to={`/view/${snippet.id}`} className="block w-full">
        {/* Username */}
        <div className="flex flex-col w-full">
          {/* Title */}
          <h3 className="text-xl font-semibold tracking-wide text-teal-400 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {snippet.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-md mb-4">
            {snippet.description}
          </p>

        

          //TODO: when user clicks on a username in homecard fetch all snippets beloning to that user
          <p className="text-gray-100 text-sm font-bold mt-4 p-2 bg-indigo-400 w-fit rounded-3xl mb-2 ">
            @{snippet.username}
          </p>

        </div>
      </Link>
    </div>
  );
}
