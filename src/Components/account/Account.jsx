import React, { useEffect, useState } from 'react';
import { createSnippet, getSnippetsByUserId } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';
import '../../styles/style.css';
import Header from '../Shared/Header.jsx';
import SnippetForm from './SnippetForm.jsx';
import UserInfo from './UserInfo.jsx';

export default function Account() {


  const [title, setTitle] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [snippets, setSnippets] = useState([])

  const { user, loading } = FetchUser()

  useEffect(() => {
    const fetchSnippets = async () => {
      const data = await getSnippetsByUserId(user.id)
      if (data) {
        setSnippets(data)
      }
    }
    fetchSnippets()
  })

  const formatCreatedDate = (createdDate) => {
    return new Date(createdDate).toLocaleDateString()
  }

  const languages = [
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'Python',
    'Java',
    'C#',
    'C++',
    'PHP',
    'Go',
    'Rust',
    'Ruby',
    'Kotlin',
    'Swift',
    'Dart',
    'Perl',
    'Lua',
    'Haskell',
    'Elixir',
    'Clojure',
    'F#']


  const handleSnippetCreateSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: title,
      isPrivate: isPrivate,
      language: language,
      description: description,
      code: code,
      username: user.user_metadata.display_username,
      userId: user.id

    }

    if (!title || !language || !description || !code) {
      setMessage('Fill in all fields')
      return
    }
    await createSnippet(body, setMessage)
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")

      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])


  if (loading) {
    return <>
      <h1>Loading...</h1>
    </>
  }


  return (
    <div className='h-screen'>
      <Header />

      <div className="flex bg-black p-3 gap-5 h-[800px]">

        <UserInfo
          user={user}
          formatCreatedDate={formatCreatedDate}
          snippets={snippets} />
      
        <SnippetForm
          message={message}
          setTitle={setTitle}
          setCode={setCode}
          handleSnippetCreateSubmit={handleSnippetCreateSubmit}
          setLanguage={setLanguage}
          languages={languages}
          setIsPrivate={setIsPrivate}
          setDescription={setDescription}
        />


      </div>

    </div>
  );
}
