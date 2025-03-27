import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth.jsx';
import { getSnippetById, saveSnippet } from '../../service/snippets.js';
import "../../styles/style.css";
import { copyCode } from '../../utils/helpers.js';
import CommentForm from '../snippet/CommentForm.jsx';
import ViewSnippet from '../snippet/ViewSnippet.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Snippet() {

  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)



  const { user } = useAuth()

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