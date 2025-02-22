"use server";
import { getOtherPost, getUserDataByUserIds } from "@/features/getOtherPost";

// 投稿に作成者の情報を追加する関数
export async function fetchPostsWithUser() {
  try {
    const posts = await getOtherPost();
    if (posts?.length === 0) return [];

    // 投稿の作成者ID（user_id）を取得
    const userIds = [...new Set(posts?.map((post: any) => post.user_id))];

    // ユーザー情報を取得
    const users = await getUserDataByUserIds(userIds);

    // 投稿に作成者情報を追加

    const postsWithUsers = posts?.map((post: any) => {
      const user = users.find((user: any) => user.id === post.user_id);
      return { ...post, user };
    });

    return postsWithUsers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
