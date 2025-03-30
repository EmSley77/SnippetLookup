import React, { useEffect, useState } from 'react';
import { FaCheck, FaCopy, FaEye, FaHeart } from 'react-icons/fa6';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, atomDark, duotoneLight, materialDark, materialLight, nightOwl, oneLight, solarizedDarkAtom, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../styles/style.css';

export default function ViewPost({
    post,
    handleSaveSnippet,
    isSaved,
    setIsCopied,
    isCopied,
    handleCopyCode,
    sections }) {

    const [theme, setTheme] = useState(vscDarkPlus);
    const [copyCount, setCopyCount] = useState(post.copy_count);

    useEffect(() => {
        if (post && post?.copy_count) {
            setCopyCount(post.copy_count)
        }
    }, [post])


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
    return (
        <div className="max-w-3xl mx-auto p-8 shadow-2xl rounded-xl  bg-gradient-to-br from-gray-700 to-gray-800 text-white">
            <h1 className="text-4xl font-extrabold text-indigo-400">{post.title}</h1>
            <p className="mt-3 text-lg text-gray-300 ">{post.description}</p>

            <hr className="my-5 border-gray-600" />

            <div className='flex items-center justify-around gap-4 mb-6 text-gray-400'>
                <div className="flex items-center gap-2"><FaCopy className='size-5 text-indigo-400' /> {copyCount}</div>
                <div className="flex items-center gap-2"><FaEye className='size-5 text-indigo-400' /> {post.views_count}</div>
                <button className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-lg"
                    onClick={handleSaveSnippet}>
                    {isSaved ? <FaCheck className="text-green-400" /> : <FaHeart />}
                </button>
            </div>

            <hr className="my-5 border-gray-600" />
            {sections.map((sec) => (
                sec.type === "code" ? (
                    <div key={sec.id} className="mb-8">
                        <div className="flex justify-between items-center bg-gray-900 p-4 rounded-t-xl shadow-lg">
                            <button className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-200"
                                onClick={() => {
                                    setCopyCount(copyCount + 1);
                                    handleCopyCode(sec.content, setIsCopied, isCopied);
                                }}>
                                {isCopied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                            </button>
                            <select onChange={e => handleThemeChange(e)}
                                className="text-white bg-gray-800 p-2 rounded-xl border-2 border-indigo-400 outline-none">
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

                        </div>
                        <SyntaxHighlighter language={sec.language} style={theme}
                            className="rounded-b-xl overflow-hidden shadow-lg">
                            {sec.content}
                        </SyntaxHighlighter>
                    </div>
                ) : sec.type === "requirements" ? (
                    // Render requirements in boxes
                    <div key={sec.id} className='mb-10 p-5 bg-gray-900 rounded-xl shadow-lg'>
                        <h2 className='text-xl text-indigo-300 '>{sec.order_index}.</h2>
                        <div className=" text-white p-2 rounded-lg  w-full">
                            {sec.content}
                        </div>
                    </div>
                ) : (
                    // Regular text section
                    <div key={sec.id} className='mb-10 p-5 rounded-xl bg-gray-800 '>
                        <h2 className='text-xl text-indigo-300 '>{sec.order_index}.</h2>
                        <pre className="text-gray-200 p-4 rounded-lg whitespace-pre-wrap break-words  w-full">
                            {sec.content}
                        </pre>
                    </div>
                )
            ))}

            <p className="text-gray-400 mt-6"><strong>Author:</strong> @{post.username}</p>
            <p className="text-gray-400"><strong>Date upload: </strong>{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
    );
}


//     return (
//         <>
//             <div className="p-6 flex flex-col justify-between w-full text-white">

//                 <h1 className="text-3xl font-bold text-teal-300">{post.title}</h1>
//                 <hr className="mb-3 mt-2 border-gray-600" />
//                 <p className="text-gray-300 mb-3 mt-3">{post.description}</p>
//                 <hr className="my-4 border-gray-700 " />
//                 <div className='flex items-center gap-2 mb-3'>
//                     <FaCopy className='size-7' /> {copyCount}
//                     <FaEye className='size-7' /> {post.views_count}
//                 </div>


//                 {sections.map((sec) => (
//                     sec.type === "code" ? (
//                         <div key={sec.id}>
//                             {/* Code Block Section */}
//                             <div className="flex gap-2 justify-around w-full bg-gradient-to-b from-gray-600 to-gray-700 p-2 rounded-t-xl">
//                                 <button className={actionButtonClass}
//                                     onClick={() => {
//                                         setCopyCount(copyCount + 1)
//                                         handleCopyCode(sec.content, setIsCopied, isCopied)
//                                     }}>
//                                     {isCopied ? <FaCheck /> : <FaCopy />}
//                                 </button>
//                                 <select onChange={e => handleThemeChange(e)} className='text-white bg-gray-700 p-2 rounded-xl border-2 border-teal-300'>
//                                     <option value="" disabled>Change theme</option>
//                                     <optgroup label='Dark'>
//                                         <option value="vscDarkPlus">VSC Dark Plus</option>
//                                         <option value="nightOwl">Night Owl</option>
//                                         <option value="materialDark">Material Dark</option>
//                                         <option value="atomDark">Atom Dark</option>
//                                         <option value="a11Dark">A11Dark</option>
//                                         <option value="solarizedDarkAtom">Solarized Dark Atom</option>
//                                     </optgroup>

//                                     <optgroup label='Light'>
//                                         <option value="oneLight">One Light</option>
//                                         <option value="materialLight">Material Light</option>
//                                         <option value="duotoneLight">Duotone Light</option>
//                                     </optgroup>
//                                 </select>

//                                 <button className={actionButtonClass} onClick={handleSaveSnippet}>
//                                     {isSaved ? <FaCheck /> : <FaHeart />}
//                                 </button>
//                             </div>
//                             <div className=" overflow-x-auto mb-5 shadow-md">
//                                 {/* display code with theme */}
//                                 <SyntaxHighlighter
//                                     language={sec.language}
//                                     style={theme}
//                                 >
//                                     {sec.content}
//                                 </SyntaxHighlighter>
//                             </div>
//                         </div>
//                     ) : (
//                         <div key={sec.id} className='flex space-x-1 justify-center text-black'>
//                             <h2 className='text-xl text-white'>{sec.order_index}.</h2>
//                             <pre className="bg-gray-100 p-4 rounded-xl whitespace-pre-wrap break-words mb-5 shadow-md w-full">
//                                 {sec.content}
//                             </pre>
//                         </div>
//                     )
//                 ))}

//                 <p className="text-gray-400"><strong>Author:</strong> @{post.username}</p>
//                 <p className="text-gray-400"><strong>Date upload: </strong>{new Date(post.created_at).toLocaleDateString()}</p>

//             </div>
//         </>

//     );
// }

// const actionButtonClass = " hover:bg-teal-600 p-2 rounded-lg transition-all cursor-pointer"
