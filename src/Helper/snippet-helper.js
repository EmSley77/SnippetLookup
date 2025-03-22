import { supabaseClient } from "../Helper/supabase-helper.js";
export {
    createSnippet,
    getUserSnippets,
    getSnippets,
    getSnippetById,
    getSnippetsWithPagination,
    saveSnippet,
    getSaved,
};

//get all public snippets
async function getSnippets(setData) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("is_private", false);

    if (data) {
        setData(data);
        return;
    }

    if (error) {
        setData([]);
        return;
    }
}

//get public paginated
async function getSnippetsWithPagination(setData) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("is_private", false)
        .range(0, 20);

    if (data) {
        console.log(data);
        setData(data);
        return;
    }

    if (error) {
        setData([]);
        return;
    }
}

//get snippet by id
async function getSnippetById(snippetId, setSnippet) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("id", snippetId);

    if (error) {
        setSnippet({});
        return;
    }

    if (data) {
        setSnippet(data[0]);
        return;
    }
}

//get snippets by user-id
async function getUserSnippets(userId, setSnippets) {
    const { data, error } = await supabaseClient
        .from("snippet")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        setSnippets([]);
        return;
    }

    setSnippets(data);
}

//get snippet by id saved
//! get by id still little
async function getSavedSnippetById(snippetId) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("id", snippetId)
        

    if (error) {
        console.error(error.message);
        return;
    }

    if (data) {
        console.log(data);
        return data;
    }
}

//get saved snippets by user-id
//!works
async function getSavedSnippets(userId) {
    const { data, error } = await supabaseClient
        .from("saved")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error(error.message);
        return;
    }

    if (data && data.length > 0) {
        return data;
    }
}

//get snippet by id saved
async function getSaved(params) {
    const savedlist = await getSavedSnippets(params.userId);

    console.log("savedlisr", savedlist);

    if (savedlist.length > 0) {
        const results = await Promise.all(
            savedlist.map(async (item) => {                
                return await getSavedSnippetById(item.snippet_id);
            })
        );

        console.log(results.flat());
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
