import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth.jsx';
import usePosts from '../../hooks/usePosts.jsx';
import useSections from '../../hooks/useSections.jsx';
import "../../styles/style.css";
import CommentForm from '../post/CommentForm.jsx';
import ViewPost from '../post/ViewPost.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';


export default function Snippet() {

  const param = useParams();

  const [post, setPost] = useState({})
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [sections, setSections] = useState([])

  const { getPostById } = usePosts()
  const { getSectionsByPostId } = useSections()
  const { user } = useAuth()



  const fetchPostData = useCallback(async () => {

    const postdata = await getPostById(param.postId)
    setPost(postdata)
    const sections = await getSectionsByPostId(param.postId)
    setSections(sections)
  }, [param.postId])


  useEffect(() => {
    fetchPostData()
  }, [fetchPostData])


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






  return (
    <>
      <Header />

      <div className="flex flex-col justify-center p-3 gap-5  w-full md:w-[1000px] mx-auto">

        {/* Snippet View Component */}
        <ViewPost
          user={user}
          post={post}
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