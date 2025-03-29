import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, atomDark, duotoneLight, materialDark, materialLight, nightOwl, oneLight, solarizedDarkAtom, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { FaCheck, FaCopy, FaEye, FaHeart } from 'react-icons/fa6';
import '../../styles/style.css';

export default function ViewSnippet({
    snippet,
    handleSaveSnippet,
    isSaved,
    setIsCopied,
    isCopied,
    handleCopyCode, sections }) {



    const [theme, setTheme] = useState(vscDarkPlus);

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        //dark
        if (selectedTheme === "nightOwl") setTheme(nightOwl);
        if (selectedTheme === "materialDark") setTheme(materialDark);
        if (selectedTheme === "vscDarkPlus") setTheme(vscDarkPlus);
        if (selectedTheme === "atomDark") setTheme(atomDark);
        if (selectedTheme === "a11Dark") setTheme(a11yDark);
        if (selectedTheme === "solarizedDarkAtom") setTheme(solarizedDarkAtom);
        //light
        if (selectedTheme === "oneLight") setTheme(oneLight);
        if (selectedTheme === "materialLight") setTheme(materialLight);
        if (selectedTheme === "duotoneLight") setTheme(duotoneLight);
    };



    console.log(sections);

//TODO: fix views count not counting

    return (
        <>
            <div className="p-6 flex flex-col justify-between w-full text-white">

                <h1 className="text-3xl font-bold text-teal-300">{snippet.title}</h1>
                <hr className="mb-3 mt-2 border-gray-600" />
                <p className="text-gray-300 mb-3 mt-3">{snippet.description}</p>
                <hr className="my-4 border-gray-700 " />
                <div className='flex items-center gap-2 mb-3'>

                    <FaEye className='size-7' /> {snippet.views_count}
                </div>

              
                {sections.map((sec) => (
                    sec.type === "code" ? (
                        <>
                            {/* Code Block Section */}
                            <div className="flex gap-2 justify-around w-full bg-gradient-to-b from-gray-600 to-gray-700 p-2 rounded-t-xl">
                                <button className={actionButtonClass}
                                    onClick={() => handleCopyCode(snippet.code, setIsCopied, isCopied)}>
                                    {isCopied ? <FaCheck /> : <FaCopy />}
                                </button>
                                <select onChange={e => handleThemeChange(e)} className='text-white bg-gray-700 p-2 rounded-xl border-2 border-teal-300'>
                                    <option value="" disabled>Change theme</option>
                                    <optgroup label='Dark'>
                                        <option value="vscDarkPlus">VSC Dark Plus</option>
                                        <option value="nightOwl">Night Owl</option>
                                        <option value="materialDark">Material Dark</option>
                                        <option value="atomDark">Atom Dark</option>
                                        <option value="a11Dark">A11Dark</option>
                                        <option value="solarizedDarkAtom">Solarized Dark Atom</option>
                                    </optgroup>

                                    <optgroup label='Light'>
                                        <option value="oneLight">One Light</option>
                                        <option value="materialLight">Material Light</option>
                                        <option value="duotoneLight">Duotone Light</option>
                                    </optgroup>
                                </select>

                                <button className={actionButtonClass} onClick={handleSaveSnippet}>
                                    {isSaved ? <FaCheck /> : <FaHeart />}
                                </button>
                            </div>
                            <div className="bg-gray-950 overflow-x-auto mb-5 shadow-md">
                                {/* display code with theme */}
                                <SyntaxHighlighter
                                    language={sec.language}
                                    style={theme}
                                >
                                    {sec.content}
                                </SyntaxHighlighter>
                            </div>
                        </>
                    ) : (
                            <div key={sec.id} className='flex space-x-1 justify-center'>
                                <h1 className='text-xl'>{sec.order_index}.</h1>
                                <pre className="bg-gray-950 p-4 rounded-xl whitespace-pre-wrap break-words mb-5 shadow-md w-full">
                                    {sec.content}
                                </pre>
                            </div>
                    )
                ))}

                <p className="text-gray-400"><strong>Author:</strong> @{snippet.username}</p>
                <p className="text-gray-400"><strong>Date upload: </strong>{new Date(snippet.created_at).toLocaleDateString()}</p>

            </div>
        </>

    );
}

const actionButtonClass = " hover:bg-teal-600 p-2 rounded-lg transition-all cursor-pointer"
