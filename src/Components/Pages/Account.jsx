import React, { useState, useEffect } from 'react';
import { response } from '../../Helper/user-metadata.js';
import { createSnippet } from '../../Helper/snippet-helper.js';
import Header from '../Shared/Header';
import '../../Styles/account.css'

export default function Account() {

  const [title, setTitle] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const user = response.data.user.user_metadata;

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
      username: user.display_username,
      userId: response.data.user.id

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
      <div className="account-wrapper">
        <div className='account-container'>

          {/* User Info Section */}
          <div className='account-info-container'>
            <h2>My Information</h2>
            <hr />
            <h3><strong>Username:</strong> {user.display_username}</h3>
            <h3><strong>Email:</strong> {user.email}</h3>
            <h3><strong>Preferred language:</strong> {user.preferred_language}</h3>
            <h3><strong>Created account:</strong> {formatCreatedDate(response.data.user.created_at)}</h3>
            <hr />
          </div>

          {/* New Snippet Form */}
          <div className='form-container'>
            <h2>Create New Snippet</h2>
            <form onSubmit={handleSnippetCreateSubmit} className='new-snippet-form'>
              <input type="text" placeholder='Title' onChange={e => setTitle(e.target.value)} required />

              <div className='form-group'>
                <label htmlFor="check">Private snippet?</label>
                <input className='new-snippet-form-check' type="checkbox" id='check' onChange={e => setIsPrivate(e.target.checked)} />
              </div>

              <select onChange={e => setLanguage(e.target.value)} required>
                <option value="" disabled selected>Select Language</option>
                {languages.map(lang => (
                  <option key={lang.toLowerCase()} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>

              <input type="text" placeholder='Description' onChange={e => setDescription(e.target.value)} required />

              <textarea placeholder='Code' className='text-area-code' onChange={e => setCode(e.target.value)} required></textarea>

              <button type='submit' className='submit-btn'>Submit</button>
              {message && <p className='message'>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
