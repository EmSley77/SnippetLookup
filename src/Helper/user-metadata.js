import { supabaseClient } from "./supabase-helper";


const response = await supabaseClient.auth.getUser();

//get meta data such aas name, lastname username and more 
/* const {
    data: { user },
} = await supabase.auth.getUser();
let metadata = user.user_metadata; */

export { response };
