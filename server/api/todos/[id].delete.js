import { supabaseAdmin } from "~~/server/utils/supabaseAdmin";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { error } = await supabaseAdmin.from("todos").delete().eq("id", id);

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return { ok: true, id };
});
