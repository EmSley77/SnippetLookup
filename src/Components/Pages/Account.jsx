import React, { useState, useEffect } from 'react';
import { userDetails } from '../../service/user-metadata.js';
import { createSnippet } from '../../service/snippet-helper.js';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import '../../styles/style.css'

export default function Account() {


  const [title, setTitle] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')


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
      username: userDetails.user_metadata.display_username,
      userId: userDetails.id

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


  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center">
        <div className='grid  gap-2 lg:grid-cols-2 p-4 bg-gray-200 shadow-2xl mt-2 rounded-xl w-lvh h-150'>

          <div className='flex flex-col'>

            {/* User Info Section */}
            <div className='flex flex-col text-gray-800 text-2xl mb-2'>
              <h2>My Information</h2>
              <hr />
              <h2><strong>Username:</strong> {userDetails.user_metadata.display_username}</h2>
              <h3><strong>Email:</strong> {userDetails.email}</h3>
              <h3><strong>Preferred language:</strong> {userDetails.user_metadata.preferred_language}</h3>
              <h2><strong>Created account:</strong> {formatCreatedDate(userDetails.created_at)}</h2>
              <hr />
            </div>
          {/* users won snippets  */}
          <div className='flex flex-col bg-gray-100 h-full p-2 rounded-xl '>
            <h1>Get snippets here that belong and uploaded by user and maybe impl note taking funcitonality</h1>
          </div>
          </div>

          {/* New Snippet Form */}
          <div className='p-4 text-center'>
            <h1 className='text-2xl'>Create New Snippet</h1>
            <form onSubmit={handleSnippetCreateSubmit} className='flex flex-col justify-between items-center h-full p-3'>
              <input type="text" className='w-full bg-gray-100 rounded-xl shadow-lg p-2 ' placeholder='Title' onChange={e => setTitle(e.target.value)} required />

              <input type="text" className='w-full bg-gray-100 rounded-xl shadow-lg p-2 ' placeholder='Description' onChange={e => setDescription(e.target.value)} required />

              <textarea placeholder='Code' className='resize-none w-full h-30 bg-gray-100 p-2 rounded-xl shadow-lg text-gray-600' onChange={e => setCode(e.target.value)} required></textarea>


              <select className='bg-gray-100 p-2 rounded-xl shadow-lg' onChange={e => setLanguage(e.target.value)} required>
                <option value="" disabled selected>Select Language</option>
                {languages.map(lang => (
                  <option key={lang.toLowerCase()} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
              <div className='flex flex-col shadow-lg rounded-xl p-2 bg-gray-100'>
                <label htmlFor="check">Private snippet?</label>
                <input className='h-10' type="checkbox" id='check' onChange={e => setIsPrivate(e.target.checked)} />
              </div>
              <button type='submit' className='p-3 bg-gray-100 rounded-xl hover:bg-gray-200 shadow-lg cursor-pointer transition-all'>Submit</button>
              {message && <p className='message'>{message}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
