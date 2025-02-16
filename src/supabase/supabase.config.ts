import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const saveUserToDatabase = async (user: any) => {
  if (!user) {
    console.error("❌ Clerk のユーザー情報が取得できません");
    return;
  }

  const userId = user.id;
  const username = user.fullName || "Unknown";
  const icon = user.imageUrl || "";

  console.log("🟢 Supabase に保存するデータ:", { userId, username, icon });

  const { data, error } = await supabase.from('User').upsert([
    {
      id: userId,
      username,
      icon,
    },
  ]);

  if (error) {
    console.error(
      "❌ Supabase へのデータ保存エラー:",
      JSON.stringify(error, null, 2)
    );
  } else {
    console.log("✅ Supabase にユーザー情報を保存成功:", data);
  }
};
