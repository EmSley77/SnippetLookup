import React, { useEffect, useState } from 'react';
import { getCommentsBySnippetId, makeComment } from '../../service/snippet-helper.js';
import { getSession } from '../../service/user-session.js';
import '../../styles/style.css';
import CommentCard from './CommentCard.jsx';
import DangerAlert from '../util/DangerAlert.jsx';

//get props from Snippet page
export default function CommentForm({ snippetId, userId, username }) {

    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [comments, setComments] = useState([])

    // Fetch comments when snippetId changes
    useEffect(() => {
        if (snippetId) {
            const fetchComments = async () => {
                try {
                    const data = await getCommentsBySnippetId(snippetId);
                    setComments(data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            };

            fetchComments();
        }
    }, [snippetId]); // Re-fetch comments if snippetId changes

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!snippetId || !userId || !username || !comment) {
            setMessage("Please make sure all fields are filled.");
            return; // Prevent submission if required data is missing
        }

        try {
            // Submit the comment
            const msg = await makeComment(userId, snippetId, comment, username);
            setMessage(msg);  // Show the message returned from the API
            setComment(''); // Clear the comment input

            // Optimistically add the new comment to the state (no need to re-fetch)
            setComments((prevComments) => [
                ...prevComments,
                { username, content: comment, snippet_id: snippetId, user_id: userId },
            ]);
        } catch (error) {
            console.error("Error submitting comment:", error);
            setMessage("There was an error submitting your comment.");
        }
    };

    // Message timeout to hide success/error message after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="w-full flex flex-col bg-gray-900 rounded-lg p-4 text-white ">
            {/* Header */}
            <div className='w-full text-center'>
                <h1 className="text-2xl font-bold text-white">Discussion</h1>
            </div>

            {/* Messages Container (Starts from Top) */}
            <div className="flex flex-col overflow-y-auto p-2 flex-grow">
                {comments && comments.map((item) => (
                    <CommentCard item={item} id={item.id} key={item.id} />
                ))}
            </div>


            {/* Comment Form (Always Stays at Bottom) */}
            <form onSubmit={handleCommentSubmit} className="w-full">
                <div className="w-full px-3 my-2">
                    <textarea
                        onChange={e => setComment(e.target.value)}
                        className="bg-gray-700 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium focus:outline-none"
                        name="body"
                        placeholder="Type Your Comment"
                        required
                    ></textarea>
                </div>

                <div className="w-full flex flex-col justify-end px-3">
                    <input
                        type="submit"
                        className="px-2.5 py-1.5 rounded-xl w-fit text-m bg-indigo-500 cursor-pointer hover:bg-indigo-700 transition-all"
                        value="Post Comment"
                    />
                    <div className='w-full flex text-center justify-center my-3'>
                        {message && <span><h1>{message}</h1></span>}
                    </div>
                </div>
            </form>
        </div>

    );
};