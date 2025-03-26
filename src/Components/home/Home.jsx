import React, { useEffect, useMemo, useState } from 'react';
import { getSnippetsWithPagination } from '../../service/snippet-helper.js';
import '../../styles/style.css';
import Search from '../search/Search.jsx';
import Header from '../Shared/Header.jsx';
import HomeList from './HomeList.jsx';


export default function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  //fetch snippet data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSnippetsWithPagination(page);

      if (data.length === 0) {
        return
      }
      setData(data)
    }
    fetchData();
  }, [page]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    let filtered = data;

    if (category) {
      filtered = filtered.filter((item) =>
        item.language?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchInput) {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filtered;
  }, [data, category, searchInput]);

  if (!data || data.length === 0) {
    return (
      <div><h2 className='text-white'>No snippets available</h2></div>
    )
  }

  return (
    <>
      <Header />
      <div className='h-screen flex flex-col items-center  text-white' >

        <Search
          category={category}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setCategory={setCategory}
        />

        <HomeList data={filteredData} />
      

        <div className='w-fit flex gap-3 p-4 bg-gray-900 rounded-xl '>
          <button onClick={prev => setPage(prev - 1)}
            className='p-2 bg-gray-600 rounded-xl hover:bg-gray-400 transition-all cursor-pointer'>
            back
          </button>
          <button onClick={prev => setPage(prev + 1)}
            className='p-2 bg-gray-600 rounded-xl hover:bg-gray-400 transition-all cursor-pointer'>
            next
          </button>
        </div>


      </div>

    </>
  )
}
