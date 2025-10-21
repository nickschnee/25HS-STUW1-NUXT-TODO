import { createClient } from "@supabase/supabase-js";

// Same as your Node supaClient.js, but placed in server/ so it never goes to the client.
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
