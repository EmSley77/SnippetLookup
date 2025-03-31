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
    <div className="w-full px-4 ">
      <div className="mb-10 w-full">
        <div className="mb-8 overflow-hidden rounded-lg w-full h-64 flex justify-center items-center bg-gray-800">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div>
          {post.date && (
            <span className="mb-5 inline-block rounded bg-indigo-500 px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          )}
          <h3>
            <Link
              to={`/view/${post.id}`}
              onClick={handleCardClick}
              className="mb-4 inline-block text-xl font-semibold text-white hover:text-indigo-400 sm:text-2xl lg:text-xl xl:text-2xl"
            >
              {post.title}
            </Link>
          </h3>
          <p className=" text-gray-300 overflow-x-hidden">
            {post.description}
          </p>
          <p className="text-sm font-bold mt-4 p-2 bg-indigo-400 rounded-3xl text-white">
            @{post.username}
          </p>
        </div>
      </div>
    </div>
  );
}