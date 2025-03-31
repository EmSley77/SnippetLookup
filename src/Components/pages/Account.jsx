import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.jsx';
import usePosts from '../../hooks/usePosts.jsx'
import '../../styles/style.css';
import UserInfo from '../account/UserInfo.jsx';
import Header from './Header.jsx';
import Bar from '../chart/Bar.jsx';
import { Link } from 'react-router';

export default function Account() {

  const [posts, setPosts] = useState([])

  const { user, loading } = useAuth()
  const { getPostsByUserId, deletePost } = usePosts()


  const handleDelete = async (postId) => {
    try {

      const isDeleted = await deletePost(user.id, postId)
      if (isDeleted) {
        setPosts(...posts.filter(post => post.id !== postId))
      }
    } catch (error) {
      console.error("Could not delete post", error)
    }

  }


  const fetchPosts = useCallback(async () => {
    if (!user) return;

    try {
      const data = await getPostsByUserId(user.id);
      if (data) {
        setPosts(data);

      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const formatCreatedDate = (createdDate) => {
    return new Date(createdDate).toLocaleDateString()
  }

  if (loading) {
    return <>
      <h1>Loading...</h1>
    </>
  }

  return (
    <div className="h-screen text-white">

      {/* Header Section */}
      <Header />

      <div className="flex flex-col p-3 gap-5 h-full">

        {/* User Info Section */}
        <UserInfo
          user={user}
          formatCreatedDate={formatCreatedDate}
          posts={posts}
          handleDelete={handleDelete}
        />

      </div>

    </div>
  );
};