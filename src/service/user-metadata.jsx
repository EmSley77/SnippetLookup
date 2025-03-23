import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-helper";

export function FetchUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabaseClient.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setUser(data.user);
            }
            setLoading(false);
        };

        getUser();
    }, []);

    return { user, loading };
}
