import React, { useCallback, useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts.jsx';
import '../../styles/style.css';
import { handleInputChange } from '../../utils/helpers.js';
import CommentCard from './CommentCard.jsx';

//get props from Snippet page
export default function CommentForm({ postId, userId, username }) {

    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [comments, setComments] = useState([])
    const { getCommentsByPostId, createComment } = usePosts()

    // Fetch comments when snippetId changes
    const fetchComments = useCallback(async () => {


        try {
            const data = await getCommentsByPostId(postId);
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }

    }, [postId])

    useEffect(() => {
        if (postId) {

            fetchComments();
        }
    }, [fetchComments, postId]); // Re-fetch comments if snippetId changes

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!postId || !userId || !username || !comment) {
            setMessage("Please make sure all fields are filled.");
            return; // Prevent submission if required data is missing
        }

        try {
            // Submit the comment
            const msg = await createComment(userId, postId, comment, username);
            setMessage(msg);  // Show the message returned from the API
            setComment(''); // Clear the comment input

            // Optimistically add the new comment to the state (no need to re-fetch)
            setComments((prevComments) => [
                ...prevComments,
                { username, comment: comment, snippet_id: postId, user_id: userId, created_at: new Date().toLocaleDateString() },
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
        <div className="w-full flex flex-col  p-4 text-white">
        
                <h1 className='text-2xl'>{comments.length} Comments</h1>
            {/* Messages Container (Starts from Top) */}
            <div className="flex flex-col overflow-y-auto p-2 flex-grow">
                {comments ? comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        key={comment.id}
                    />
                )) : <p>No disscussion yet</p>}
                {/* Comment Form (Always Stays at Bottom) */}
                <form onSubmit={handleCommentSubmit} className="w-full">
                    <div className="w-full  my-2">
                        <textarea
                            onChange={e => handleInputChange(e, setComment)}
                            className="bg-gray-700 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium focus:outline-none"
                            name="body"
                            placeholder="Add to the discussion"
                            required
                        ></textarea>
                    </div>

                    <div className="w-full flex flex-col justify-end ">
                        <input
                            type="submit"
                            className="px-2.5 py-1.5 rounded-xl  text-m bg-indigo-500 cursor-pointer hover:bg-indigo-700 transition-all"
                            value="Post Comment"
                        />

                    </div>
                </form>
            </div>

        </div>
    );
};