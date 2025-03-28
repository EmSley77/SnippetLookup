import { supabaseClient } from '../service/supabase';

export default function useAnon() {

    const getSnippetViews = async (id) => {
        const { data, error } = await supabaseClient
            .from("snippets")
            .select("views_count")
            .eq("id", id);

        if (error) {
            return null;
        }

        if (data) {
            console.log(data[0].views_count + 1);
            return data[0].views_count;
        }
    }


    const updateSnippetViewCount = async (updatedCount, snippetId) => {
        const { data, error } = await supabaseClient
            .from('snippets')
            .update({ views_count: updatedCount }) // Ensure currentViews is valid
            .eq('id', snippetId)
            .select();

        if (error) {
            console.error('Error updating view count:', error);
            return;
        }

        console.log("Success", data);
    }


    return { getSnippetViews, updateSnippetViewCount }

}
