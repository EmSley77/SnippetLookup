import React, { useEffect, useState } from 'react'
import SnippetList from './Snippets/SnippetList.jsx'
import { getData } from '../js/data'

export default function App() {

  const [data, setData] = useState([])
  const [isCopied, setIsCopied] = useState(false)
  const [snippetIndex, setSnippetIndex] = useState(null)


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
      setSnippetIndex(null)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])

  const handleCopyButton = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setSnippetIndex(index)
    } catch (error) {
      console.error(error)
    }
  }

  if (!data || data.length === 0) {
    return (
      <div><h2>No snippets available</h2></div>
    )
  }

  return (
    <>
      <div style={{}}>
        <SnippetList
          data={data}
          snippetIndex={snippetIndex}
          handleCopyButton={handleCopyButton}
          isCopied={isCopied}
        />
      </div>
    </>
  )
}
