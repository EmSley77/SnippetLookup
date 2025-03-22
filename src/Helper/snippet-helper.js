import { supabaseClient } from "../Helper/supabase-helper.js";
export {
    createSnippet,
    getUserSnippets,
    getSnippets,
    getSnippetById,
    getSnippetsWithPagination,
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
async function getSnippetById(id, setSnippet) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("*")
        .eq("id", id);

    if (data) {
        setSnippet(data[0]);
        return;
    }

    if (error) {
        setSnippet({});
        return;
    }
}

//get snippets by user-id
async function getUserSnippets(userId, setSnippets) {
    const { data, error } = await supabaseClient
        .from("snippet")
        .select("*")
        .eq("user_id", userId);

    if (data) {
        setSnippets(data);
        return;
    }

    if (error) {
        setSnippets([]);
        return;
    }
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

    if (data) {
        setMessage("Snippet has been created successfully");
        return;
    }

    if (error) {
        setMessage(error.message);
        return;
    }
}
