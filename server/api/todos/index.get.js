import { supabaseAdmin } from "~~/server/utils/supabaseAdmin";

export default defineEventHandler(async () => {
  const { data, error } = await supabaseAdmin
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
