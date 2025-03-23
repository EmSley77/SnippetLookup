import React, { useEffect, useState } from 'react';
import { getSnippets } from '../../service/snippet-helper.js';
import Footer from '../Shared/Footer.jsx';
import Header from '../Shared/Header.jsx';
import HomeList from './HomeList.jsx';
import '../../styles/style.css'
import Search from '../search/Search.jsx';


export default function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  //fetch snippet data
  useEffect(() => {
    const fetchData = async () => {
      await getSnippets(setData);
    }
    fetchData();

  }, []);

  useEffect(() => {

    let filtered = data

    if (searchInput) {
      filtered = filtered.filter(item => item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchInput.toLowerCase()));

    }

    if (category) {
      filtered = filtered.filter(item => item.language?.toLowerCase() === category.toLowerCase());
    }

    setFilteredData(filtered)
  }, [data, category, searchInput])

  if (!data || data.length === 0) {
    return (
      <div><h2 className='text-white'>No snippets available</h2></div>
    )
  }

  return (
    <>
      <Header />
      <div className='h-screen' >

        <Search
          category={category}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setCategory={setCategory}
        />

        <HomeList  data={filteredData} />

      </div>
      <Footer />
    </>
  )
}
