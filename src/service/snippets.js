import { supabaseClient } from "./supabase.js";
export {
    createSnippet,
    getSnippetsByUserId,
    getSnippets,
    getSnippetById,
    getSnippetsWithPagination,
    saveSnippet,
    getSaved,
    removeSaved,
    makeComment,
    getCommentsBySnippetId,
    getSnippetsCounted
};

//get all public snippets
async function getSnippets(setData) {
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
async function getSnippetsWithPagination(page) {
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
//get snippet by id
async function getSnippetById(snippetId) {
    const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .eq("id", snippetId);

    if (error) {
        return;
    }

    if (data && data.length > 0) {
        return data[0];
    }
}

//get snippets by user-id
async function getSnippetsByUserId(userId) {
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

//get snippet by id saved
async function getSavedSnippetById(snippetId) {
    const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .eq("id", snippetId);

    if (error) {
        return;
    }

    if (data) {
        return data;
    }
}

//get saved snippets by user-id
async function getSavedSnippets(userId) {
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

//get snippet by id saved
async function getSaved(params) {
    const savedlist = await getSavedSnippets(params.userId);
    if (!savedlist || savedlist.length === 0) return;
    if (savedlist.length > 0) {
        const results = await Promise.all(
            savedlist.map(async (item) => {
                return await getSavedSnippetById(item.snippet_id);
            })
        );

        return results;
    }

    return [];
}

//fetch comments by snippet id

//fetch likes by snippet id

//fetch snippets paginated

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
        
        return data
    } else {
        setMessage("Failed to create snippet");
    }
}

//check snippet by snippet ID and user ID
async function checkSaved(params) {
    const { data, error } = await supabaseClient
        .from("saved")
        .select("*")
        .eq("snippet_id", params.snippetId)
        .eq("user_id", params.userId);

    if (error) {
        params.setMessage("Something went wrong when checking saved snippets");
        return false;
    }

    return data.length > 0; // Returns true if snippet is already saved
}

//save snippet to liked
async function saveSnippet(params) {
    const isSaved = await checkSaved(params);

    if (isSaved) {
        return false;
    }

    const { data, error } = await supabaseClient
        .from("saved")
        .insert([
            {
                user_id: params.userId,
                snippet_id: params.snippetId,
            },
        ])
        .select();

    if (error || !data?.length) return false;

    return true;
}

//make a commetn
async function makeComment(userId, snippetId, comment, username) {
    const { data, error } = await supabaseClient
        .from("comments")
        .insert([
            {
                snippet_id: snippetId,
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
async function getCommentsBySnippetId(snippetId) {
    const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("snippet_id", snippetId);

    if (error) {
        return [];
    }

    if (data && data.length > 0) {
        return data;
    }
    return [];
}

//remove from favorites
async function removeSaved(params) {
    const { error } = await supabaseClient
        .from("saved")
        .delete()
        .eq("snippet_id", params.snippetId)
        .eq("user_id", params.userId);

    if (error) {
        return;
    }
}
