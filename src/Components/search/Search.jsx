import React from 'react'
import '../../styles/style.css'

export default function Search({searchInput, setSearchInput}) {
    return (
        <div
            className="flex flex-col md:flex-row items-center justify-center gap-4 p-5">
            <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="bg-white text-gray-900 shadow-lg w-72 p-3 rounded-xl transition-all duration-300 focus:outline-none "
                type="text"
                placeholder="Search..."
            />
        </div>
    );
};