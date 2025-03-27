import { supabaseClient } from "./supabase";

async function getSession() {
    try {
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error);
            return false;
        }

        return data?.session || false;
    } catch (err) {
        console.error("An error occurred while fetching the session:", err);
        return false;
    }
}

export { getSession };
