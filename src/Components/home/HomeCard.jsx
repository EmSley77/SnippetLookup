import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css'
import { supabaseClient, getViewCount } from '../../service/supabase.js'

export default function HomeCard({ snippet }) {

  //TODO fix this issue not working updating view_count
  //TODO last alternative use a new table to store each time its haas been view add new row
  const handleCardClick = async () => {

    const currentViews = await getViewCount(snippet.id);
    if (!snippet?.id) {
      console.log("Snippet ID is missing");
      return
    }

    const newCount = (currentViews || 0) + 1
    const { data, error } = await supabaseClient
      .from('snippets')
      .update({ views_count: newCount }) // Ensure currentViews is valid
      .eq('id', snippet?.id) // Safe optional chaining
      .select("*"); // Explicit selection of all fields

    if (error) {
      console.error('Error updating view count:', error);
      return;
    }

    console.log("Success", data);
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

          {/* Language Badge */}
          <div className="mt-2 mb-4">
            <span className="px-4 py-1 bg-teal-600 text-white font-semibold rounded-3xl text-sm">
              {snippet.language}
            </span>
          </div>

          //TODO: when user clicks on a username in homecard fetch all snippets beloning to that user
          <p className="text-gray-100 text-sm font-bold mt-4 p-2 bg-indigo-400 w-fit rounded-3xl mb-2 ">
            @{snippet.username}
          </p>

        </div>
      </Link>
    </div>
  );
}
