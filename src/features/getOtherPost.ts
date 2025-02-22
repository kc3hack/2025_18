"use server";
import { supabase } from "@/supabase/supabase.config";
import { getDbUserId } from "./getUserId";
export async function getOtherPost() {
  const userId = await getDbUserId();
  try {
    // Shareテーブルからuser_idに一致するreceive_post_idを全て取得
    const { data: shareData, error: shareError } = await supabase
      .from("Share")
      .select("receive_post_id")
      .eq("user_id", userId);

    if (shareError) {
      throw new Error(`Shareテーブルのデータ取得エラー: ${shareError.message}`);
    }

    if (!shareData || shareData.length === 0) {
      throw new Error("指定されたuserIdに関連するShareデータが見つかりません");
    }

    // 複数のreceive_post_idを取得
    const receivePostIds = shareData.map((share) => share.receive_post_id);

    // Postテーブルから複数のreceive_post_idに一致するデータを取得
    // ただし、自分の投稿（user_id === userId）は除外
    const { data: postData, error: postError } = await supabase
      .from("Post")
      .select("*")
      .in("id", receivePostIds)
      .neq("user_id", userId); // 自分の投稿を除外

    if (postError) {
      throw new Error(`Postテーブルのデータ取得エラー: ${postError.message}`);
    }

    return postData; // 取得した投稿データを返す（自分の投稿は含まれない）
  } catch (error) {
    console.error(error);
    return null; // エラー時はnullを返す
  }
}

// `Post` の `user_id` から `User` の情報を取得する関数
export async function getUserDataByUserIds(userIds: string[]) {
  try {
    if (userIds.length === 0) return [];

    // Userテーブルから `username` を取得
    const { data: usersData, error: usersError } = await supabase
      .from("User")
      .select("id, username, icon") // `username` に変更
      .in("id", userIds);

    if (usersError) {
      throw new Error(`Userテーブルのデータ取得エラー: ${usersError.message}`);
    }

    return usersData.map((user) => ({
      id: user.id,
      fullName: user.username, // `fullName` を `username` に変更
      imageUrl: user.icon,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
