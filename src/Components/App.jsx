import React, { useEffect, useState } from 'react'
import SnippetList from './Snippets/SnippetList.jsx'
import { getData } from '../js/data'

export default function App() {

  const [data, setData] = useState([])
  const [isCopied, setIsCopied] = useState(false)
  const [snippetId, setSnippetId] = useState(null)
  const [searchInput, setSearchInput] = useState(null)


  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const newData = await getData();
      setData(newData)
    }
    fetchData()

  }, []);

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      setSnippetId(null)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])

  const handleCopyButton = async (snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setIsCopied(true)
      setSnippetId(snippet.id)
    } catch (error) {
      console.error(error)
    }
  }

  if (!data || data.length === 0) {
    return (
      <div><h2>No snippets available</h2></div>
    )
  }

  //TODO handle search todo logic here
  //if empty or blank print all otherwise print related to language or title
  const handleSearch = () => {

  }

  return (
    <>
      {/* Add a header here */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <div>

          <input
            style={{
              padding: "1rem",
              margin: "1rem",
              width: "300px",
              borderRadius: "10px",
            }}
            type="text"
            placeholder='Search'
            value={searchInput}
            onInput={e => setSearchInput(e.target.value)} />
        </div>
        <SnippetList
          data={data}
          snippetId={snippetId}
          handleCopyButton={handleCopyButton}
          isCopied={isCopied}
        />
      </div>
      {/* Add a footer here add some map or info */}
    </>
  )
}
