import React, { useEffect, useState } from 'react';
import { createSnippet } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';
import '../../styles/style.css';
import Footer from '../Shared/Footer.jsx';
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

  const { user, loading } = FetchUser()


  console.log(user);


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
    <>
      <Header />
      <div className="grid grid-cols-2 p-3 gap-5">
        <UserInfo user={user} formatCreatedDate={formatCreatedDate} />

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

      <Footer />
    </>
  );
}
