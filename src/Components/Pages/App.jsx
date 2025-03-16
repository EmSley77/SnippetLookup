import React, { useEffect, useState } from 'react'
import { getData } from '../../js/data.js'
import SnippetList from '../SnippetHelper/SnippetList.jsx'

export default function App() {

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [snippetId, setSnippetId] = useState(null)
  const [searchInput, setSearchInput] = useState('')


  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const newData = await getData();
      setData(newData)
    }
    fetchData()

  }, []);

  if (!data || data.length === 0) {
    return (
      <div><h2>No snippets available</h2></div>
    )
  }

  //if empty or blank print all otherwise print related to language or title
  const handleSearch = (e) => {
    setSearchInput(e.target.value)
    const filtered = data.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredData(filtered)
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
            className='search-input'
            type="text"
            placeholder='Search'
            value={searchInput}
            onChange={handleSearch} />
        </div>

        {filteredData.length === 0 && searchInput.length > 0 ? <h1 style={{ color: "#fff" }}>No results were found with: {searchInput}</h1> : <SnippetList
          data={filteredData.length === 0 || searchInput === '' ? data : filteredData}
          snippetId={snippetId}
          isCopied={isCopied}
        />}
      </div>
      {/* Add a footer here add some map or info */}
    </>
  )
}
