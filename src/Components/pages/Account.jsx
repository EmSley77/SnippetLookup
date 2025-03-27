import React, { useEffect, useState } from 'react';
import { getSnippetsByUserId } from '../../service/snippets.js';
import { FetchUser } from '../../service/current-user.js';
import '../../styles/style.css';
import Header from './Header.jsx';
import UserInfo from '../account/UserInfo.jsx';

export default function Account() {

  const [snippets, setSnippets] = useState([])
  const { user, loading } = FetchUser()

  useEffect(() => {
    if (!loading && user) {
      const fetchSnippets = async () => {
        const data = await getSnippetsByUserId(user.id)
        if (data) {
          setSnippets(data)
        }
      }
      fetchSnippets()
    }
  }, [loading, user])

  const formatCreatedDate = (createdDate) => {
    return new Date(createdDate).toLocaleDateString()
  }

  if (loading) {
    return <>
      <h1>Loading...</h1>
    </>
  }


  return (
    <div className="h-screen bg-gray-900 text-white">

      {/* Header Section */}
      <Header />

      <div className="flex p-3 gap-5 h-full">

        {/* User Info Section */}
        <UserInfo
          user={user}
          formatCreatedDate={formatCreatedDate}
          snippets={snippets}
        />



      </div>

    </div>
  );
};