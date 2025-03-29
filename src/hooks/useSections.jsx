import { supabaseClient } from '../service/supabase.js';

const useAuthSections = () => {

    const savePost = async (sections, postId) => {

        //save post first then sections

        const { error } = await supabaseClient
            .from('sections')
            .insert(sections.map((section, index) => ({
                type: section.type,
                post_id: postId,
                content: section.content,
                language: section.language || null, // Optional field
                order_index: index + 1, // Ensure correct order
            })))

        if (error) {
            return
        }

    };


    const getSectionsByPostId = async (postId) => {


        let { data: sections, error } = await supabaseClient
            .from('sections')
            .select('*')
            .eq("post_id", postId)

        if (error) {
            return
        }

        if (sections) {
            return sections
        }
    }

    return { savePost, getSectionsByPostId }
}

export default useAuthSections
