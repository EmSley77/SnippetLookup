import React, { useEffect, useState } from 'react';
import { FaCheck, FaCopy, FaEye, FaHeart } from 'react-icons/fa6';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { supabaseClient } from '../../service/supabase.js';
import { a11yDark, atomDark, duotoneLight, materialDark, materialLight, nightOwl, oneLight, solarizedDarkAtom, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useAnon from '../../hooks/useAnon.jsx';
import '../../styles/style.css';
import usePosts from '../../hooks/usePosts.jsx';

export default function ViewPost({
    user,
    post,
    sections }) {


    const { updatePostCopyCount, getPostCopyCount } = useAnon();

    const [theme, setTheme] = useState(vscDarkPlus);
    const [saved, setSaved] = useState(false);
    const [copyCount, setCopyCount] = useState(post.copy_count);
    const { savePost } = usePosts()

    useEffect(() => {
        if (post && post?.copy_count) {
            setCopyCount(post.copy_count)
        }
    }, [post])

    useEffect(() => {
        if (saved) {
            const timer = setTimeout(() => {

                setSaved(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [saved])
    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            setSaved(true)

        } catch (error) {
            console.error(error);
        }
    }

    const updateCopyCount = async () => {
        const currentCount = await getPostCopyCount(post.id);
        const updatedCount = (currentCount || 0) + 1
        await updatePostCopyCount(updatedCount, post.id)
    }

    const handleSavePost = async () => {
        if (!user) {
            alert("You must be signed in to save posts")
            return
        }


        if (saved) {
            alert("already saved this post")
            return
        }

        const { error } = await supabaseClient
            .from("saved")
            .select("*")
            .eq("post_id", post.id)
            .eq("user_id", user.id)

        if (error) {
            return
        }

        const isSaved = await savePost(user.id, post.id)
        setSaved(isSaved)
    }

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
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-gray-100 shadow-lg rounded-xl">
            {/* Title & Description */}
            <h1 className="text-4xl font-extrabold text-gray-900">{post.title}</h1>
            <p className="mt-3 text-lg text-gray-700">{post.description}</p>

            <hr className="my-5 border-gray-300" />

            {/* Post Info */}
            <div className="flex items-center justify-around gap-4 mb-6  text-gray-600">
                <div className="flex items-center gap-2"><FaCopy className="size-5 text-indigo-600" /> {copyCount}</div>
                <div className="flex items-center gap-2"><FaEye className="size-5 text-indigo-600" /> {post.views_count}</div>
                <button
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md"
                    onClick={handleSavePost}>
                    {saved ? <FaCheck className="text-green-400" /> : <FaHeart className="text-white" />}
                </button>
            </div>

            <hr className="my-5 border-gray-300" />

            {/* Sections */}
            {sections.map((sec) => (
                sec.type === "code" ? (
                    <div key={sec.id} className="mb-8">
                        {/* Code Header */}
                        <div className="flex justify-between items-center  bg-gray-200 p-3 rounded-t-xl shadow-md">
                            <button
                                className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white"
                                onClick={() => {
                                    setCopyCount(copyCount + 1);
                                    updateCopyCount();
                                    copyText(sec.content);
                                }}>
                                {saved ? <FaCheck className="text-green-400" /> : <FaCopy />}
                            </button>
                            <select
                                onChange={handleThemeChange}
                                className="bg-white p-2 rounded-xl border-2 border-indigo-400 outline-none">
                                <option value="" disabled>Change theme</option>
                                <optgroup label="Dark">
                                    <option value="vscDarkPlus">VSC Dark Plus</option>
                                    <option value="nightOwl">Night Owl</option>
                                    <option value="materialDark">Material Dark</option>
                                    <option value="atomDark">Atom Dark</option>
                                    <option value="a11Dark">A11Dark</option>
                                    <option value="solarizedDarkAtom">Solarized Dark Atom</option>
                                </optgroup>
                                <optgroup label="Light">
                                    <option value="oneLight">One Light</option>
                                    <option value="materialLight">Material Light</option>
                                    <option value="duotoneLight">Duotone Light</option>
                                </optgroup>
                            </select>
                        </div>

                        {/* Code Block */}
                        <SyntaxHighlighter language={sec.language} style={theme || oneLight} className="rounded-b-xl overflow-hidden shadow-md">
                            {sec.content}
                        </SyntaxHighlighter>
                    </div>
                ) : sec.type === "requirements" ? (
                    <div key={sec.id} className="mb-8 p-5 bg-gray-900 rounded-xl shadow-md">
                        <div className="p-2 text-gray-100 flex justify-between">
                            {sec.content}
                            <button className="cursor-pointer text-indigo-500" onClick={() => copyText(sec.content)}>
                                {saved ? <FaCheck /> : <FaCopy />}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div key={sec.id} className="mb-8 p-5 rounded-xl bg-gray-50 shadow-md">
                        <pre className="p-4 text-gray-800 whitespace-pre-wrap break-words">{sec.content}</pre>
                    </div>
                )
            ))}

            {/* Author Info */}
            <p className="mt-6 text-gray-600">
                <strong>Written By:</strong> @{post.username}
            </p>
            <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
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
