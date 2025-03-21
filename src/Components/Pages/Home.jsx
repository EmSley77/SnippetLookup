import React, { useEffect, useState } from 'react'
import { getData } from '../../js/data.js'
import SnippetList from '../SnippetHelper/SnippetList.jsx'
import Header from '../Shared/Header.jsx';
import Footer from '../Shared/Footer.jsx';

export default function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  //fetch snippet data
  useEffect(() => {
    const fetchData = async () => {
      const newData = await getData();
      setData(newData)
    }
    fetchData();

  }, []);

  useEffect(() => {

    let filtered = data
    if (searchInput) {
      filtered = filtered.filter(item => item.title?.toLowerCase().includes(searchInput.toLowerCase()));
    }

    if (category) {
      filtered = filtered.filter(item => item.language?.toLowerCase() === category.toLowerCase());
    }

    setFilteredData(filtered)
  }, [data, category, searchInput])

  if (!data || data.length === 0) {
    return (
      <div><h2 style={{color:"#fff"}}>No snippets available</h2></div>
    )
  }
  
  return (
    <>
    <Header />
      <div
        style={{
      
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>

        <div>

          <input
            onChange={e => setSearchInput(e.target.value)}
            value={searchInput}
            className='search-input'
            type="text"
            placeholder='Search'
          />

          <select
            onChange={e => setCategory(e.target.value)}
            value={category}
            >
            <option value="">All</option>
            <optgroup label="Frontend">
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </optgroup>
            <optgroup label="Backend">
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="php">PHP</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="ruby">Ruby</option>
              <option value="kotlin">Kotlin</option>
              <option value="swift">Swift</option>
              <option value="dart">Dart</option>
              <option value="perl">Perl</option>
              <option value="lua">Lua</option>
              <option value="haskell">Haskell</option>
              <option value="elixir">Elixir</option>
              <option value="clojure">Clojure</option>
              <option value="fsharp">F#</option>
            </optgroup>
          </select>

        </div>

            <div>
              <h2 style={{color:"#fff"}}>found {filteredData.length} snippets</h2>
            </div>
        {filteredData.length === 0 && searchInput.length > 0 ? <h1 style={{ color: "#fff" }}>No results were found with: {searchInput || category}</h1> : <SnippetList 
          data={filteredData} />}

      </div>
      <Footer />
    </>
  )
}
