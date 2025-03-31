import React, { useCallback, useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts.jsx';
import '../../styles/style.css';
import { handleInputChange } from '../../utils/helpers.js';
import CommentCard from './CommentCard.jsx';
import { FaComment } from 'react-icons/fa';

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
        <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            {/* Comments Header */}
            <div className="flex items-center gap-2 mb-4 text-gray-900">
                <FaComment className="size-6 text-indigo-600" />
                <h1 className="text-2xl font-semibold">{comments.length} Comments</h1>
            </div>

            {/* Messages Container */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-80 p-2">
                {comments.length > 0 ? (
                    comments.map((comment) => <CommentCard comment={comment} key={comment.id} />)
                ) : (
                    <p className="text-gray-500 text-center">No discussion yet</p>
                )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                    onChange={(e) => handleInputChange(e, setComment)}
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                    name="body"
                    placeholder="Add to the discussion..."
                    required
                ></textarea>

                <button
                    type="submit"
                    className="mt-4 w-full bg-indigo-500 text-white font-medium py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all"
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
}
