import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import copyIcon from '../../assets/copy white.png';
import { copyCode } from '../../js/copy';
import { getSnippetById, saveSnippet } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';
import "../../styles/style.css";
import Footer from '../Shared/Footer.jsx';
import Header from '../Shared/Header.jsx';
import CommentForm from './CommentForm.jsx';
import ViewSnippet from './ViewSnippet.jsx';

export default function Snippet() {

  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)



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
      snippetId: snippet.id,
      userId: user.id
    }
    const hasSaved = await saveSnippet(params)
    setIsSaved(hasSaved)
  }

  if (loading) {
    return <><h1 className='text-white'>Loading in user details...</h1></>
  }

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center p-3 gap-5  w-full md:w-[1000px] mx-auto">

        {/* Snippet View Component */}
        <ViewSnippet
          snippet={snippet}
          handleSaveSnippet={handleSaveSnippet}
          isSaved={isSaved}
          setIsCopied={setIsCopied}
          isCopied={isCopied}
          copyIcon={copyIcon}
          copyCode={copyCode}
        />

        {/* Comment Form - Only Visible if User Exists */}
        {user && (
          <CommentForm
            userId={user.id}
            snippetId={snippet.id}
            username={user.user_metadata.display_username}
          />
        )}

      </div>
      <Footer />
    </>
  );
}