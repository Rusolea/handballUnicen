import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;
export const getSupabase = () => {
    if (!supabase) {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabase;
};

let supabaseAdmin;
export const getSupabaseAdmin = () => {
    if (!supabaseAdmin) {
        const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
        if (!supabaseServiceKey) {
            throw new Error("Supabase service key is not configured. Make sure VITE_SUPABASE_SERVICE_KEY is set.");
        }
        supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return supabaseAdmin;
};