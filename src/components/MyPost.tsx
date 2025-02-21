"use client";

import { getMyPost } from "@/features/getMyPost";
import React, { useEffect, useState } from "react";

function MyPost() {
  const [posts, setPosts] = useState<any[]>([]); // 投稿データを保持

  useEffect(() => {
    const fetchPosts = async () => {
      const myPosts = await getMyPost(); // 自分の投稿を取得
      if (myPosts) {
        setPosts(myPosts);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return null; // 投稿がない場合は何も表示しない

  return (
    <div className='space-y-6'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='w-[350px] h-[280px] rounded-[20px] overflow-hidden border border-[#9D7858] text-[#9D7858] font-semibold'
        >
          <div className='w-full h-[193px] bg-slate-200 overflow-hidden'>
            <img
              src={post.image} // Supabaseに保存されている画像URL
              alt='Post Image'
              className='w-full h-full object-cover aspect-video z-10'
            />
          </div>
          <div className='w-full h-[87px] p-3'>
            <p className='text-[24px] mb-2 ml-2 font-semibold text-[#9D7858]'>
              {post.title}
            </p>
            <a href={post.mapurl} className='text-[16px] text-[#9D7858]'>
              📍{post.title}の場所はこちら
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPost;
