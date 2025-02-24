"use client";
import { fetchPostsWithUser } from "@/features/fetchPostsWithUser"; // ユーザー情報付き投稿を取得
import React, { useEffect, useState } from "react";
import OtherDetailPost from "./OtherDetalPost";

function OtherPost() {
  const [posts, setPosts] = useState<any[]>([]); // 投稿データを保持
  const [selectedPost, setSelectedPost] = useState<any | null>(null); // 選択された投稿
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態

  useEffect(() => {
    const fetchPosts = async () => {
      const otherPosts = await fetchPostsWithUser(); // 投稿データ＋作成者情報を取得
      if (otherPosts) {
        setPosts(otherPosts);
      }
    };

    fetchPosts();
  }, []);

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='space-y-6'>
        {posts.map(
          (post) => (
            console.log(post), // 追加
            (
              <div
                key={post.id}
                className='mx-auto w-[350px] h-[286px] rounded-[20px] overflow-hidden border border-[#9D7858] text-[#9D7858] font-semibold cursor-pointer'
                onClick={() => openModal(post)} // モーダルを開く
              >
                <div className='w-full h-[193px] bg-slate-200 overflow-hidden'>
                  <img
                    src={post.image}
                    alt='Post Image'
                    className='w-full h-full object-cover aspect-video z-10'
                  />
                </div>
                <div className='w-full h-[87px] p-2'>
                  <div className='flex items-center justify-between'>
                    <p className='text-[24px] ml-2 font-semibold text-[#9D7858] whitespace-nowrap'>
                      {post.title}
                    </p>
                  </div>
                  <p className='font-semibold text-xs text-[#E8CF8F] ml-2 mr-1 whitespace-nowrap'>
                    {post.user?.fullName ||
                      post.user?.full_name ||
                      "Unknown user"}
                  </p>
                  <a className='text-[16px] text-[#9D7858] truncate block max-w-[350px] whitespace-nowrap'>
                    📍{post.mapname}
                  </a>
                </div>
              </div>
            )
          )
        )}
      </div>
      <div>
        {/* モーダル表示部分 */}
        {isModalOpen && selectedPost && (
          <div
            className='z-[100] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            onClick={closeModal} // 外側をクリックすると閉じる
          >
            <div
              className='relative'
              onClick={(e) => e.stopPropagation()} // モーダル内のクリックで閉じないように
            >
              {/* `onClose` を渡してバツボタンを機能させる */}
              <OtherDetailPost post={selectedPost} onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtherPost;
