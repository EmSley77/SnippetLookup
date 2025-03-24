import React from 'react'
import '../../styles/style.css'
import { useState } from 'react';

//get props from Snippet page
export default function CommentForm({ snippetId, userId }) {

    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        //add post method here
        //snippet id and userId needed in the post function
        //aswell message if commetn has been sent and comment to which to use in post



    }

    return (
        <div className="flex flex-col w-full items-center justify-center shadow-lg m-2  text-white bg-gray-900 rounded-xl ">
            <form className="  px-4 w-full " onSubmit={handleCommentSubmit}>
                <div className="flex flex-col ">
                    <h2 className="px-4 pt-3 pb-2 text-lg">Add a new comment</h2>
                    <hr />
                    <div className="px-3 mb-2 mt-2">
                        <textarea
                            className="bg-gray-700 rounded border 
                             border-gray-400 leading-normal resize-none w-full h-40 py-2 px-3 font-medium  shadow-lg placeholder-gray-700 focus:outline-none "
                            name="body"
                            placeholder="Type Your Comment"
                            onChange={e => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="w-full md:w-full flex items-start px-3">

                        <div className="-mr-1 text-center w-full">
                            <input
                                type="submit"
                                className="shadow-lg cursor-pointer bg-gray-700 font-medium py-1 px-4 border border-gray rounded-lg tracking-wide mr-1 hover:bg-gray-800 transition-all"
                                value="Post Comment"
                            />
                            {message && <span><h2 >{message}</h2></span>}
                        </div>
                    </div>

                </div>
            </form>

            <div className='flex flex-col w-full h-full bg-gray-900 m-2 rounded-xl p-2'>
                <hr />
                <div className='text-white text-center'>
                    <h1 className='text-xl'>Comments</h1>
                    <hr />
                </div>


            </div>
        </div>
    );
};

