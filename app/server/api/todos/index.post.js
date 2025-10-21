import { supabaseAdmin } from "~/server/utils/supabaseAdmin";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.task || !body.task.trim()) {
    throw createError({ statusCode: 400, message: "task is required" });
  }

  const { data, error } = await supabaseAdmin
    .from("todos")
    .insert({ task: body.task.trim() })
    .select()
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
