import {supabaseClient} from '../service/supabase.js';

const useAuthSections = () => {

    const savePost = async (sections, postId) => {

        //save post first then sections

        const {error} = await supabaseClient
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

    /*
    *
    * const avatarFile = event.target.files[0]
    const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload('public/avatar1.png', avatarFile, {
    cacheControl: '3600',
    upsert: false
  })
    *
    * */


    const getSectionsByPostId = async (postId) => {

        let {data: sections, error} = await supabaseClient
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

    return {savePost, getSectionsByPostId}
}

export default useAuthSections
