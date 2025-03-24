import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import checkIcon from '../../assets/check white.png';
import copyIcon from '../../assets/copy white.png';
import heartIcon from '../../assets/heart.png';
import likeIcon from '../../assets/thumb up.png';
import dislikeIcon from '../../assets/thumbs down.png';
import { copyCode } from '../../js/copy';
import { getSnippetById, saveSnippet } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';

import "../../styles/style.css";
import CommentForm from './CommentForm.jsx';

export default function Snippet() {

  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const { user, loading } = FetchUser()



  useEffect(() => {
    const fetchById = async () => {
      const data = await getSnippetById(param.snippetid)
      setSnippet(data)
    }
    fetchById()
  }, [param.snippetid])

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setMessage('')
      return () => clearTimeout(messageTimer)
    }, 3000)
  }, [message])

  const handleSaveSnippet = async () => {
    const params = {
      setMessage: setMessage,
      snippetId: snippet.id,
      userId: user.id
    }
    await saveSnippet(params)
  }
  if (loading) return <><h1>Loading...</h1></>
  return (
    <div className="grid grid-cols-2 p-3 gap-5 h-screen">
      <div className="bg-gray-900 text-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
        <hr className='mb-2 mt-2'/>
        <p className="text-gray-300"><strong>Description:</strong> {snippet.description}</p>
        <p className="text-gray-400"><strong>Creator:</strong> @{snippet.username}</p>
        <h2 className="text-lg font-semibold text-gray-300 mt-2">{snippet.language}</h2>

        <hr className="my-4 border-gray-700" />

        {/* Code Block */}
        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative">
          <h4 className="mb-2 font-semibold text-gray-200">Code</h4>
          <hr className="mb-3 mt-4 border-gray-600" />
          <pre className="whitespace-pre-wrap">{snippet.code}</pre>
          <button
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all "
            onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}
          >
            <img src={isCopied ? checkIcon : copyIcon} alt="copy icon" className="h-6 cursor-pointer" />
          </button>
        </div>

        <hr className="my-4 border-gray-700 w-1/2 mx-auto" />

        {/* Like/Save/Dislike Buttons */}
        <div className="flex justify-center gap-4 bg-gray-700 rounded-xl p-3">
          <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer">
            <img src={likeIcon} alt="like icon" className="h-6" />
          </button>
          <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer" onClick={handleSaveSnippet}>
            <img src={heartIcon} alt="save icon" className="h-6" />
          </button>
          <button className="p-2 hover:bg-gray-600 rounded-lg transition-all cursor-pointer">
            <img src={dislikeIcon} alt="dislike icon" className="h-6" />
          </button>
        </div>

        <hr className="my-4 border-gray-700 w-1/2 mx-auto" />

        {/* Message */}
        {message && <h2 className="text-center text-green-400 font-semibold">{message}</h2>}

        {/* Return Link */}
        <div className=" mt-4">
          <Link to="/home" className="text-white p-2 bg-indigo-500 rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
            Return
          </Link>
        </div>
      </div>

      <CommentForm userId={user.id} snippetId={snippet.id} />
    </div>
  );
};