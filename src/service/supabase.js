import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function getViewCount(id) {
    const { data, error } = await supabaseClient
        .from("snippets")
        .select("views_count")
        .eq("id", id);

    if (error) {
        console.log(error.message);
        return null;
    }

    if (data) {
        console.log(data[0].views_count);
        return data[0].views_count;
    }
}

export { supabaseClient, getViewCount };
