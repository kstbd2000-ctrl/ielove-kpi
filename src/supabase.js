import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export async function dbGet(k) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("kv_store")
    .select("value")
    .eq("key", k)
    .single();
  if (error || !data) return null;
  return data.value;
}

export async function dbSet(k, value) {
  if (!supabase) return;
  await supabase
    .from("kv_store")
    .upsert({ key: k, value, updated_at: new Date().toISOString() });
}
