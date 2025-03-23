import React from 'react'
import '../../styles/style.css'

export default function Search({ searchInput, category, setCategory, setSearchInput }) {
    return (
        <>

            <div className='m-5  flex  gap-4 items-center justify-around' >

                <input
                    onChange={e => setSearchInput(e.target.value)}
                    value={searchInput}
                    className='bg-white shadow-xl w-64 p-3 focus:border-0 rounded-xl transistion-all duration-200'
                    type="text"
                    placeholder='@user or title'
                />

                <select
                    className='bg-white shadow-xl w-50 p-3 rounded-xl cursor-pointer transition-all duration-200'
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
        </>
    )
}
