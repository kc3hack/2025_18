import { supabase } from "@/supabase/supabase.config";

export async function getUserIcon(userId: number) {
    try{
        const { data, error } = await supabase
        .from("User") // Userテーブルから取得
        .select("icon, username") // icon と username を取得
        .eq("id", userId)
        .single(); // 1人のユーザー情報を取得
    
        if (error) {
            console.error(`Error fetching user data for user ${userId}:`, error);
            return null; // エラーの場合nullを返す
        }
        // アイコンとユーザーネームを返す
        return {
            icon: data?.icon || "/default-avatar.png", // アイコンがなければデフォルトアイコンを返す
            username: data?.username || "Unknown User" // ユーザーネームがなければデフォルトの名前を返す
          };
    }catch(error){
        console.log(error);
    }
  

  }
  