import { supabaseAdmin } from "~~/server/utils/supabaseAdmin";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = (await readBody(event)) || {};

  const { data, error } = await supabaseAdmin
    .from("todos")
    .update(body) // e.g., { done: true } or { task: 'New text' }
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
