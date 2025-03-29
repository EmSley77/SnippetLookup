import { supabaseClient } from '../service/supabase';

export default function useAnon() {
    //get view count for snippet
    const getSnippetViews = async (id) => {
        const { data, error } = await supabaseClient
            .from("posts")
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
    //update view count
    const updateSnippetViewCount = async (updatedCount, snippetId) => {
        const { data, error } = await supabaseClient
            .from('posts')
            .update({ views_count: updatedCount }) // Ensure currentViews is valid
            .eq('id', snippetId)
            .select();

        if (error) {
            console.error('Error updating view count:', error);
            return;
        }

        console.log("Success", data);
    }

    //get a snippet copy count
    const getSnippetCopyCount = async (id) => {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("copy_count")
            .eq("id", id);

        if (error) {
            return null;
        }

        if (data) {
            console.log(data[0].copy_count + 1);
            return data[0].copy_count;
        }
    }

    //update snippet counter
    const updateSnippetCopyCount = async (updatedCount, snippetId) => {
        const { data, error } = await supabaseClient
            .from('posts')
            .update({ copy_count: updatedCount }) // Ensure currentViews is valid
            .eq('id', snippetId)
            .select();

        if (error) {
            console.error('Error updating view count:', error);
            return;
        }

        console.log("Success", data);
    }

    //get snippet sections
    const getPostSections = async (snippetId) => {
        const { data, error } = await supabaseClient
            .from("sections")
            .select("*")
            .eq("snippet_id", snippetId);

        if (error) {
            return null;
        }

        if (data) {
            console.log(data)
            return data
        }
    }

    return { getSnippetViews, updateSnippetViewCount, getSnippetCopyCount, updateSnippetCopyCount, getPostSections }

}
