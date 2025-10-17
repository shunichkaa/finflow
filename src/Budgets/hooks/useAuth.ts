import {useEffect, useState} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from "../../lib/supabaseClient.ts";

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setSession(data.session);
            setLoading(false);
        });

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return {session, loading};
};