import React, { useEffect, useState } from 'react';
import { createSnippet } from '../../service/snippet-helper.js';
import { FetchUser } from '../../service/user-metadata.js';
import '../../styles/style.css';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';

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
        <div className="flex flex-col gap-2 lg:grid-cols-2 p-4 bg-gray-900 shadow-2xl rounded-xl w-full h-[800px]Gg">

          {/* User Info Section */}
          <div className="flex flex-col justify-between p-4 text-gray-300 bg-gray-700 rounded-xl shadow-md ">
            <div className="space-y-3">
              <hr className="border-gray-300" />
              <h3 className="text-lg font-bold ">@{user.user_metadata.display_username}</h3>
              <p className="text-m">
                {user.user_metadata.name} {user.user_metadata.lastname}
              </p>
              <p className="text-m">
                <strong>Preferred language:</strong> {user.user_metadata.preferred_language}
              </p>
              <p className="text-m ">
                <strong>Created account:</strong> {formatCreatedDate(user.created_at)}
              </p>
              <hr className="border-gray-300" />
            </div>
          </div>

          {/* User's Snippets Section */}
          <div className="flex flex-col bg-gray-900 p-4 rounded-xl shadow-md h-full text-white">
            <h1 className="text-lg font-medium ">User Snippets</h1>
            <p className="text-s ">Retrieve and display user-uploaded snippets here.</p>
            <hr />
          </div>
          <div>
            {/* list of snippets goes here */}
          </div>
        </div>

        {/* New Snippet Form */}
        <div className="flex flex-col justify-between p-6 bg-gray-900 text-white rounded-xl ">
          <div className='flex w-full justify-center items-center'>

            <h1 className="text-2xl font-semibold ">Create New Snippet</h1>
          </div>
          <form onSubmit={handleSnippetCreateSubmit} className="flex flex-col gap-3 p-4  rounded-xl  justify-between h-full w-full">

            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg p-3 shadow-md"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg p-3 shadow-md"
              placeholder="Description"
              onChange={e => setDescription(e.target.value)}
              required
            />

            <textarea
              placeholder="Code"
              className="resize-none w-full h-40 bg-gray-700 p-3 rounded-lg shadow-md "
              onChange={e => setCode(e.target.value)}
              required
            ></textarea>

            <select className="bg-gray-700 p-3 rounded-lg shadow-md" onChange={e => setLanguage(e.target.value)} required>
              <option value="" disabled selected>Select Language</option>
              {languages.map(lang => (
                <option key={lang.toLowerCase()} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-lg shadow-md">
              <input type="checkbox" id="check" onChange={e => setIsPrivate(e.target.checked)} />
              <label htmlFor="check" className="text-sm">Private snippet?</label>
            </div>

            <button type="submit" className="p-3 bg-gray-700 rounded-lg hover:bg-gray-500 shadow-md cursor-pointer transition-all">
              Submit
            </button>

            {message && <p className="text-red-500 text-sm">{message}</p>}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
