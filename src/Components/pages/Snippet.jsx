import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAnon from '../../hooks/useAnon.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import { getSnippetById, saveSnippet } from '../../service/snippets.js';
import { supabaseClient } from '../../service/supabase.js';
import "../../styles/style.css";
import CommentForm from '../snippet/CommentForm.jsx';
import ViewSnippet from '../snippet/ViewSnippet.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import useSections from '../../hooks/useSections.jsx';


export default function Snippet() {

  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sections, setSections] = useState([])

  const {getSectionsBySnippetId} = useSections()
  const { user } = useAuth()

  const { updateSnippetCopyCount, getSnippetCopyCount } = useAnon();

  const handleCopyCode = async (code, setIsCopied, isCopied) => {
    if (isCopied) return;

    if (!snippet?.id) return

    const currentCount = await getSnippetCopyCount(snippet.id);

    const updatedCount = currentCount + 1
    await updateSnippetCopyCount(updatedCount, snippet.id)


    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchById = async () => {
      const data = await getSnippetById(param.snippetid)
      setSnippet(data)

      const sectionData = await getSectionsBySnippetId(param.snippetid)
      setSections(sectionData)

    }
    fetchById()
  }, [param.snippetid])
  console.log(sections);


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
    //TODO check if already saved before proceeding
    const { data, error } = await supabaseClient.from("saved").select("*").eq("snippet_id", snippet.id).eq("user_id", user.id)
    if (error) {
      setMessage(error.message)
      return
    }
    if (data && data.length > 0) {
      return;
    }
    const params = {
      snippetId: snippet.id,
      userId: user.id
    }
    const hasSaved = await saveSnippet(params)
    setSaved(hasSaved)
  }

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center p-3 gap-5  w-full md:w-[1000px] mx-auto">

        {/* Snippet View Component */}
        <ViewSnippet
          snippet={snippet}
          handleSaveSnippet={handleSaveSnippet}
          isSaved={saved}
          setIsCopied={setIsCopied}
          isCopied={isCopied}
          handleCopyCode={handleCopyCode}
          sections={sections}
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