import { supabaseClient } from "./supabase.js";
export {
    createSnippet,
    getCommentsBySnippetId,
    getSavedByUserId,
    getPostById,
    getPosts,
    getPostsByUserId,
    getSnippetsCounted,
    getPaginatedPosts,
    makeComment,
    removeSaved,
    savePost,
};

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
async function getSnippetsCounted() {
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

//newSnippet
async function createSnippet(body, setMessage) {
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
        setMessage(error.message);
        return;
    }

    if (data && data.length > 0) {
        setMessage("Snippet has been created successfully");
        console.log(data[0].id);

        return data;
    } else {
        setMessage("Failed to create snippet");
    }
}

//check snippet by snippet ID and user ID
async function checkSaved(userId, postId) {
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
    const isSaved = await checkSaved(userId, postId);


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
async function makeComment(userId, postId, comment, username) {
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
async function getCommentsBySnippetId(postId) {
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
async function removeSaved(userId, postId) {
    const { error } = await supabaseClient
        .from("saved")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);

    if (error) {
        return;
    }
}
