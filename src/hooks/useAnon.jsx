import { supabaseClient } from '../service/supabase';

export default function useAnon() {
    //get view count for snippet
    const getPostViews = async (postId) => {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("views_count")
            .eq("id", postId)
            .single(); // Ensures we get only one row instead of an array


        if (error) {
            return null;
        }

        if (!data) {
            return 0;
        }

        return data.views_count;
    };

    // Update the view count
    const updatePostViewCount = async (updatedCount, postId) => {
        const {  error } = await supabaseClient
            .from("posts")
            .update({ views_count: updatedCount })
            .eq("id", postId)
            .select();



        if (error) {
            return false;
        }

        return true;
    };
    //get a snippet copy count
    const getPostCopyCount = async (id) => {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("copy_count")
            .eq("id", id);

        if (error) {
            return null;
        }

        if (data) {
            return data[0].copy_count;
        }
    }

    //update snippet counter
    const updatePostCopyCount = async (updatedCount, snippetId) => {
        const { error } = await supabaseClient
            .from('posts')
            .update({ copy_count: updatedCount }) // Ensure currentViews is valid
            .eq('id', snippetId)

        if (error) {
            return;
        }
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
            return data
        }
    }

    return { getPostViews, updatePostViewCount, getPostCopyCount, updatePostCopyCount, getPostSections }

}
