import { supabase } from "@/supabase/supabase.config";

export async function judgeComment(postId: number, userId: string) {
  try {
    const { data, error } = await supabase
      .from("Comment")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId); // user_id でフィルタリング

    if (error) {
      console.log(error);
      return false; // エラーがあった場合は false を返す
    }

    // data が空でない場合は true を返し、空なら false
    return data && data.length > 0;
  } catch (error) {
    console.log(error);
    return false; // エラーが発生した場合も false を返す
  }
}
