import React from 'react'
import { supabaseClient } from '../service/supabase.js'

const useAuthSections = () => {

    const savePost = async (sections, snippetId) => {

        //save post first then sections

        const { data, error } = await supabaseClient
            .from('sections')
            .insert(sections.map((section, index) => ({
                type: section.type,
                snippet_id: snippetId,
                content: section.content,
                language: section.language || null, // Optional field
                order_index: index + 1, // Ensure correct order
            })))
            .select();

        if (error) {
            console.error("Error inserting sections:", error);
        }
        if (data) {
            console.log("Inserted sections:", data);
        }
    };


    const getSectionsBySnippetId = async (snippetId) => {


        let { data: sections, error } = await supabaseClient
            .from('sections')
            .select('*')
            .eq("snippet_id", snippetId)

        if (error) {
            console.error("Error inserting sections:", error);
        }

        if (sections) {
            console.log("Inserted sections:", sections);
            return sections
        }
    }

    return { savePost, getSectionsBySnippetId }
}

export default useAuthSections
