import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase = url && publishableKey ? createClient(url, publishableKey) : null;
export const demoWorkspaceId = "5a3a4e39-07aa-420f-8425-c17439afd84e";
