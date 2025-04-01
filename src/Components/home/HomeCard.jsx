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

  return (
    <div className="w-full p-4 bg-white rounded-xl flex flex-col shadow-lg">

      <div className="mb-4 overflow-hidden rounded-lg w-full h-48 flex justify-center items-center bg-gray-800">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {post.created_at && (
        <span className="mb-3 inline-block rounded bg-indigo-800 px-3 py-1 text-xs font-semibold text-white w-fit">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      )}

      <h3 className="mb-2 text-lg font-semibold text-indigo-700 hover:text-indigo-400 transition-all">
        <Link to={`/view/${post.id}`} onClick={handleCardClick}>
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-700 line-clamp-2">
        {post.description}
      </p>

      <p className="text-xs font-bold mt-3 px-3 py-1 bg-indigo-800 rounded-2xl text-white w-fit">
        @{post.username}
      </p>

    </div>
  );

}