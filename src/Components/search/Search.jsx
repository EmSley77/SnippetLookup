import React from 'react'
import '../../styles/style.css'

export default function Search({ searchInput, category, setCategory, setSearchInput }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-5 text-white">
            <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="bg-gray-800 text-gray-300 shadow-lg w-72 p-3 rounded-xl transition-all duration-200  focus:outline-none border border-teal-500"
                type="text"
                placeholder="@user or title"
            />

            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="p-3 w-72 rounded-xl transition-all bg-gray-800 text-gray-300 shadow-lg border border-teal-500  focus:outline-none"
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
    );
}