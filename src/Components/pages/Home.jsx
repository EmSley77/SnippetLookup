import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { supabaseClient } from '../../service/supabase.js';
import '../../styles/style.css';
import Footer from './Footer.jsx'
import Search from '../search/Search.jsx';
import LoaderTeal from '../helper/loaders/LoaderTeal.jsx';
import HomeList from '../home/HomeList.jsx';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Header from './Header.jsx';


export default function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  const fetchData = useCallback(async (abortController) => {

    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .rpc('get_public_snippets', { p_offset: 0 })
        .abortSignal(abortController.signal)

      if (error) throw error;

      if (data && data.length > 0) {
        setData(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    } finally {
      setLoading(false)
    }
  }, []);


  useEffect(() => {
    const abortController = new AbortController(); // Create AbortController

    fetchData(abortController);

    return () => abortController.abort(); // Cleanup on unmount
  }, [fetchData]);

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
        item.username?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.language?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filtered;
  }, [data, category, searchInput]);

  if (!data || data.length === 0 || error) {

    return (
      <>
        <Header />
        <div className='flex flex-col h-screen justify-center items-center'>

          <h2 className='text-white text-center'>Something went wrong</h2>
          <h1 className='text-white text-center text-2xl'>CodeBox</h1>
          < LoaderTeal />

          <Link to={"/about"} className='text-white p-6 py-2 bg-gray-800 mt-6 rounded-xl transition-all hover:bg-gray-700'>Read more about us</Link>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className='flex flex-col h-screen justify-center items-center'>
          <h1 className='text-white text-center text-2xl'>CodeBox</h1>
          < LoaderTeal />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center text-white">

        {/* Search Bar */}
        <Search
          category={category}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setCategory={setCategory}
        />

        {/* List Data */}
        <HomeList data={filteredData} />

        {/* Pagination Buttons (Uncomment if needed) */}
        {/* 
        <div className="w-fit flex gap-3 p-4 bg-gray-900 rounded-xl">
          <button 
            onClick={() => offset > 0 && setOffset(prev => prev - 20)}
            className="p-2 bg-gray-600 rounded-xl hover:bg-gray-400 transition-all"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={() => setOffset(prev => prev + 20)}
            className="p-2 bg-gray-600 rounded-xl hover:bg-gray-400 transition-all"
          >
            <FaArrowRight />
          </button>
        </div>
        */}

      </div>
      <Footer />
    </>
  );
}
