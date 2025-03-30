import React from 'react';
import { Link } from 'react-router';
import useAnon from '../../hooks/useAnon.jsx'
import '../../styles/style.css';

export default function HomeCard({ post }) {

  const { getPostViews, updatePostViewCount } = useAnon();  

  // Handle card click to increase view count
  const handleCardClick = async () => {
    if (!post?.id) {
      console.warn("Post ID is missing");
      return;
    }

    const currentViews = await getPostViews(post.id);
    if (currentViews === null) {
      console.warn("Could not retrieve current views.");
      return;
    }
    const updatedCount = currentViews + 1;
    await updatePostViewCount(updatedCount, post.id);

  };

  //TODO: when user clicks on a username in homecard fetch all snippets beloning to that user
  return (
    <div
      key={post.id}
      className="p-6 bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-700 flex flex-col items-start"
    >
      <Link onClick={handleCardClick} to={`/view/${post.id}`} className="block w-full">
        {/* Username */}
        <div className="flex flex-col w-full">
          {/* Title */}
          <h3 className="text-xl font-semibold tracking-wide text-teal-400 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-md mb-4">
            {post.description}
          </p>



          <p className="text-gray-100 text-sm font-bold mt-4 p-2 bg-indigo-400 w-fit rounded-3xl mb-2 ">
            @{post.username}
          </p>

        </div>
      </Link>
    </div>
  );
}
