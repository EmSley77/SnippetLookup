import { supabaseClient } from "../service/supabase-helper.js";
export {
    createSnippet,
    getUserSnippets,
    getSnippets,
    getSnippetById,
    getSnippetsWithPagination,
    saveSnippet,
    getSaved,
    removeSaved,
    makeComment,
    getCommentsBySnippetId,
};

//get all public snippets
async function getSnippets(setData) {
    const { data, error } = await supabaseClient
        .from("snippets")
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
        .from("snippets")
        .select("*")
        .eq("is_private", false)
        .range(page, 20);

    if (error) {
        console.log("no more to get");
        return;
    }

    if (data && data.length > 0) {
        return data;
    }
}

//get snippet by id
async function getSnippetById(snippetId) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("id", snippetId);

    if (error) {
        return;
    }

    if (data && data.length > 0) {
        console.log(data);
        return data[0];
    }
}

//get snippets by user-id
async function getUserSnippets(userId) {
    const { data, error } = await supabaseClient
        .from("snippets")
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
async function getSavedSnippetById(snippetId) {
    const { data, error } = await supabaseClient
        .from("snippets")
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
        .from("snippets")
        .insert([
            {
                user_id: body.userId,
                is_private: body.isPrivate,
                title: body.title,
                language: body.language,
                description: body.description,
                username: body.username,
                code: body.code,
            },
        ])
        .select();

    if (error) {
        setMessage(error.message);
        return;
    }

    if (data && data.length > 0) {
        setMessage("Snippet has been created successfully");
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
        params.setMessage("Already saved This snippet");
        return;
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

    if (error) {
        params.setMessage(error.message);
        return;
    }

    if (data && data.length > 0) {
        params.setMessage("Snippet has been saved");
        return;
    }
}

//make a commetn
//TODO check if user already has commented in this snippet
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
        console.error(error.message);
        return error.message;
    }

    if (data) {
        return "your comment has been submitted thank you";
    }
}

//make a commetn
async function getCommentsBySnippetId(snippetId) {
    const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("snippet_id", snippetId);

    if (error) {
        console.error(error.message);
        return [];
    }

    if (data && data.length > 0) {
        return data;
    }
}

//remove from favorites
async function removeSaved(params) {
    const { error } = await supabaseClient
        .from("saved")
        .delete()
        .eq("snippet_id", params.snippetId)
        .eq("user_id", params.userId);

    if (error) {
        console.error(error.message);
        return;
    }
}
