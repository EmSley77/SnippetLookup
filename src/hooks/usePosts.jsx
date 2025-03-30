import React from 'react'
import { supabaseClient } from "../service/supabase.js";


const usePosts = () => {

    //get all public snippets
    async function getPosts(setData) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("is_private", false);

        if (error) {
            setData([]);
            return;
        }

        if (data && data.length > 0) {
            return data;
        }
    }

    //get public paginated
    async function getPaginatedPosts(page) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("is_private", false)
            .range(page, 20);

        if (error || data.length === 0) {
            console.log("no more to get");
            return;
        }

        if (data && data.length > 0) {
            return data;
        }
    }

    //get counted
    async function getPostCounted() {
        const { count, error } = await supabaseClient
            .from("posts")
            .select("*", { count: "exact", head: true });

        if (error) {
            console.error("Error fetching snippets count:", error);
            return null;
        }

        return count;
    }

    async function getPostById(postId) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("id", postId);

        if (error) {
            return;
        }

        if (data && data.length > 0) {
            return data[0];
        }
    }

    async function getPostsByUserId(userId) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            return [];
        }

        if (data && data.length > 0) {
            return data;
        }
    }

    async function getPostsByUsername(username) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("username", username);

        if (error) {
            return [];
        }

        if (data && data.length > 0) {
            return data;
        }
    }


    async function getSavedByUserId(userId) {

        const savedlist = await getSavedPosts(userId);

        if (!savedlist || savedlist.length === 0) return;
        if (savedlist.length > 0) {
            const results = await Promise.all(
                savedlist.map(async (item) => {
                    return await getSavedPostById(item.snippet_id);
                })
            );

            return results;
        }

        return [];
    }

    async function getSavedPosts(userId) {
        const { data, error } = await supabaseClient
            .from("saved")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            return;
        }

        if (data && data.length > 0) {
            return data;
        }
    }

    async function getSavedPostById(postId) {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .eq("id", postId);

        if (error) {
            return;
        }

        if (data) {
            return data;
        }
    }
    //newSnippet
    async function createPost(body) {
        const { data, error } = await supabaseClient
            .from("posts")
            .insert([
                {
                    user_id: body.userId,
                    is_private: body.isPrivate,
                    title: body.title,
                    description: body.description,
                    username: body.username,
                },
            ])
            .select("*");

        if (error) {
            return;
        }

        if (data && data.length > 0) {
            return data;
        }
    }

    //check snippet by snippet ID and user ID
    async function checkIfSaved(userId, postId) {
        const { data, error } = await supabaseClient
            .from("saved")
            .select("*")
            .eq("post_id", postId)
            .eq("user_id", userId);

        if (error) {
            return false;
        }

        return data.length > 0; // Returns true if snippet is already saved
    }

    //save snippet to liked
    async function savePost(userId, postId) {
        const isSaved = await checkIfSaved(userId, postId);


        if (isSaved) {
            alert("already saved")
            return false;
        }

        const { error } = await supabaseClient.from("saved").insert([
            {
                user_id: userId,
                post_id: postId,
            },
        ]);

        if (error) return false;

        return true;
    }

    //make a commetn
    async function createComment(userId, postId, comment, username) {
        const { data, error } = await supabaseClient
            .from("comments")
            .insert([
                {
                    post_id: postId,
                    user_id: userId,
                    comment: comment,
                    username: username,
                },
            ])
            .select();

        if (error) {
            return "Could not post message, try again later";
        }

        if (data) {
            return "Your comment has been submitted thank you";
        }
    }

    //get comments by snippet id
    async function getCommentsByPostId(postId) {
        const { data, error } = await supabaseClient
            .from("comments")
            .select("*")
            .eq("post_id", postId);

        if (error) {
            return [];
        }

        if (data && data.length > 0) {
            return data;
        }
        return [];
    }

    //remove from favorites
    async function deleteSaved(userId, postId) {
        const { error } = await supabaseClient
            .from("saved")
            .delete()
            .eq("post_id", postId)
            .eq("user_id", userId);

        if (error) {
            return;
        }
    }

    //delete post
    async function deletePost(userId, postId) {
        const { data, error } = await supabaseClient
            .from("posts")
            .delete()
            .eq("id", postId)
            .eq("user_id", userId).single();

        if (error) {
            return false;
        }

        if (data) {
            return true;
        }
    }

    return {
        getPaginatedPosts,
        getPostCounted,
        getPostById,
        getPostsByUserId,
        getPostsByUsername,
        getSavedByUserId,
        createPost,
        savePost,
        createComment,
        getCommentsByPostId,
        deleteSaved
    }
}


export default usePosts;

