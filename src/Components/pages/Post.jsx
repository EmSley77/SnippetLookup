import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAnon from '../../hooks/useAnon.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import useSections from '../../hooks/useSections.jsx';
import { getPostById, savePost } from '../../service/posts.js';
import { supabaseClient } from '../../service/supabase.js';
import "../../styles/style.css";
import CommentForm from '../snippet/CommentForm.jsx';
import ViewPost from '../snippet/ViewPost.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';


export default function Snippet() {

  const param = useParams();

  const [post, setPost] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sections, setSections] = useState([])

  const { getSectionsByPostId } = useSections()
  const { user } = useAuth()

  const { updatePostCopyCount, getPostCopyCount } = useAnon();


  useEffect(() => {

    const fetchPostData = async () => {
      const postdata = await getPostById(param.postId)
      setPost(postdata)

      const sections = await getSectionsByPostId(param.postId)
      setSections(sections)
    }
    fetchPostData()
  }, [])


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


  const handleCopyCode = async (code, setIsCopied, isCopied) => {
    if (isCopied) return;

    if (!post?.id) return

    const currentCount = await getPostCopyCount(post.id);

    const updatedCount = currentCount + 1
    await updatePostCopyCount(updatedCount, post.id)


    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveSnippet = async () => {
    if (!user) {
      setMessage("You must be signed in to save code snippets")
      return
    }
    //TODO check if already saved before proceeding
    const {  error } = await supabaseClient.from("saved").select("*").eq("post_id", param.postId).eq("user_id", user.id)
    if (error) {
      setMessage(error.message)
      return
    }

    const hasSaved = await savePost(user.id, post.id)
    setSaved(hasSaved)
  }

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center p-3 gap-5  w-full md:w-[1000px] mx-auto">

        {/* Snippet View Component */}
        <ViewPost
          post={post}
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
            postId={param.postId}
            username={user.user_metadata.display_username}
          />
        )}

      </div>
      <Footer />
    </>
  );
}