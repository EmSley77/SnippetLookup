import React from 'react'
import '../../styles/style.css'

export default function Search({ searchInput, setSearchInput }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-5">
            <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="bg-white text-gray-800 shadow-lg w-72 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                type="text"
                placeholder="@user or title"
            />
        </div>
    );
};