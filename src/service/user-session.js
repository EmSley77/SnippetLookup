import { supabaseClient } from "./supabase-helper";

async function getSession() {
    const { data } = await supabaseClient.auth.getSession();

    return data?.session || false;
}

export {getSession}
