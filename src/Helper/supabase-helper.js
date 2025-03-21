import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_URL;

const supabaseKey = import.meta.env.VITE_API_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabaseClient };
