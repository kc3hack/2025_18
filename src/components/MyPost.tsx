"use client";

import { getMyPost } from "@/features/getMyPost";
import React, { useEffect, useState } from "react";
import DetailPostCard from "./DetailPost";

function MyPost() {
  const [posts, setPosts] = useState<any[]>([]); // 投稿データを保持
  const [selectedPost, setSelectedPost] = useState<any | null>(null); // 選択された投稿
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態

  useEffect(() => {
    const fetchPosts = async () => {
      const myPosts = await getMyPost(); // 自分の投稿を取得
      if (myPosts) {
        setPosts(myPosts);
      }
    };

    fetchPosts();
  }, []);

  // モーダルを開く
  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (posts.length === 0) return null; // 投稿がない場合は何も表示しない

  return (
    <div className="">
      <div className='space-y-6'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='mx-auto w-[350px] h-[280px] rounded-[20px] overflow-hidden border border-[#9D7858] text-[#9D7858] font-semibold cursor-pointer'
            onClick={() => openModal(post)}
          >
            <div className='w-full h-[193px] bg-slate-200 overflow-hidden'>
              <img
                src={post.image}
                alt='Post Image'
                className='w-full h-full object-cover aspect-video z-10'
              />
            </div>
            <div className='w-full h-[87px] p-3'>
              <p className='text-[24px] mb-2 ml-2 font-semibold text-[#9D7858]'>
                {post.title}
              </p>
              <p className='text-[16px] text-[#9D7858] truncate block max-w-[350px] whitespace-nowrap'>
                📍{post.mapname}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 モーダル */}
      {isModalOpen && selectedPost && (
        <div
          className='z-[100] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
          onClick={closeModal} // 外側クリックで閉じる
        >
          <div
            className='relative'
            onClick={(e) => e.stopPropagation()} // モーダルの中身をクリックしても閉じないようにする
          >
            {/* `DetailPostCard` をモーダル内で表示 */}
            <DetailPostCard post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPost;
