import React, { useEffect, useState } from 'react';
import { getCommentsBySnippetId, makeComment } from '../../service/snippet-helper.js';
import '../../styles/style.css';

//get props from Snippet page
export default function CommentForm({ snippetId, userId }) {

    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [comments, setComments] = useState([])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        //add post method here
        //snippet id and userId needed in the post function
        //aswell message if commetn has been sent and comment to which to use in post
        const msg = await makeComment(userId, snippetId, comment);
        setMessage(msg)
        setComment('')


    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('')
        }, 3000)
        return () => clearTimeout(timer)
    }, [message])

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsBySnippetId(snippetId)
            setComments(data)
        }
        fetchComments()
    }, [snippetId])


    return (
        <div className="w-full bg-gray-900 rounded-lg p-4 text-white">

            <div className='w-full text-center'>
                <h3 className="font-bold text-xl">Discussion</h3>

            </div>
            <form onSubmit={handleCommentSubmit}>
                <div className="flex flex-col">

                    {                    //TODO: fix problems with data types and more
                    }
                    {comments && comments.map(item => (
                        <div key={item.id} className='border rounded-md p-3 ml-3 my-3 bg-gray-800 '>

                            {item.username && <p>@{item.username}</p>}
                            <hr />
                            <p className="mt-2">{item.comment}</p>



                            <p>uploaded at {new Date(item.created_at).toLocaleDateString()}</p>


                        </div>

                    ))}
                </div>

                <div className="w-full px-3 my-2 ">
                    <textarea
                        onChange={e => setComment(e.target.value)}

                        className="bg-gray-700 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-mediumfocus:outline-none "
                        name="body"
                        placeholder="Type Your Comment"
                        required
                    ></textarea>
                </div>

                <div className="w-full flex-col flex justify-end px-3 ">
                    <input
                        type="submit"
                        className="px-2.5 py-1.5 rounded-xl w-fit text-sm bg-indigo-500 cursor-pointer hover:bg-indigo-700 transition-all"
                        value="Post Comment"
                    />
                    <div className='w-full flex text-center justify-center my-3 '>
                        {message && <span><h1>{message}</h1></span>}
                    </div>
                </div>
            </form>
        </div>
    );
};