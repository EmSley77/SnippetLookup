import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import checkIcon from '../../assets/check white.png';
import copyIcon from '../../assets/copy white.png';
import heartIcon from '../../assets/heart.png';
import { copyCode } from '../../js/copy';
import { getSnippetById, saveSnippet } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';

import "../../styles/style.css";
import Header from '../Shared/Header.jsx';
import CommentForm from './CommentForm.jsx';
import ViewSnippet from './ViewSnippet.jsx';

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
    if (!user) {
      setMessage("You must be signed in to save code snippets")
      return
    }
    const params = {
      setMessage: setMessage,
      snippetId: snippet.id,
      userId: user.id
    }
    await saveSnippet(params)
  }



  return (
    <>
      <Header />
      <div className="flex p-3 gap-5 bg-black h-[800px]">

        <ViewSnippet
          snippet={snippet}
          handleSaveSnippet={handleSaveSnippet}
          setIsCopied={setIsCopied}
          isCopied={isCopied}
          message={message}
          heartIcon={heartIcon}
          checkIcon={checkIcon}
          copyIcon={copyIcon}
          copyCode={copyCode}
        />

        {user && <CommentForm
          userId={user.id}
          snippetId={snippet.id}
          username={user.user_metadata.display_username}
        />}

      </div>
    </>
  );
};