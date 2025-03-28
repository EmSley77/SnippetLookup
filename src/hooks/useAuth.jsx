import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabaseClient } from '../service/supabase.js';


const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSession = async () => {

            if (isMounted.current) {
                const { data, error } = await supabaseClient.auth.getSession();

                if (!data.session) {
                    console.log("No session for user");
                }
                if (error) {
                    console.error("No user found:", error.message);
                    setUser(null)
                } else {
                    setUser(data.session.user)
                }
                setLoading(false);
            } else {
                isMounted.current = true;

            }

        };

        fetchSession();

    }, []);



    // Sign in with email/password
    const signIn = async (email, password) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) {
            return error.message;
        }

        if (data) {
            navigate("/")
        }
    };

    // Sign out
    const signOut = async () => {
        if (!user) {
            alert("You are already signed out")
        }
        await supabaseClient.auth.signOut();
        setUser(null);
        navigate("/")
    };


    return { user, loading, signIn, signOut };
}



export default useAuth