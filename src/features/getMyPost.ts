"use server";

import { supabase } from "@/supabase/supabase.config";
import { getDbUserId } from "./getUserId";

export async function getMyPost() {
  console.log("getMyPost() が呼び出されました");

  const user_id = await getDbUserId();
  console.log("取得した user_id:", user_id); // user_id が正しく取得できているか確認

  if (!user_id) {
    console.error("ユーザーIDを取得できませんでした");
    return null;
  }

  const { data: posts, error: postError } = await supabase
    .from("Post")
    .select("*")
    .eq("user_id", user_id);

  console.log("Supabase クエリ結果:", posts); // Supabase からのデータを確認

  if (postError) {
    console.error("Supabase から自分の投稿を取得できませんでした:", postError);
    return null;
  }

  return posts;
}



