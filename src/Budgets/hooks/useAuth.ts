import {useEffect, useState} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from "../../lib/supabaseClient";

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data, error}) => {
            if (error) {
                console.error('Auth session error:', error);
                if (error.message.includes('refresh') || error.message.includes('token')) {
                    supabase.auth.signOut();
                }
                setError(error.message);
            } else {
                setSession(data.session);
                setError(null);
            }
            setLoading(false);
        });

        const {data: listener} = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            setSession(session);
            setError(null);
            setLoading(false);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return {session, loading, error};
};