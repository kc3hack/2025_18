"use client";

import { useState } from "react";

export default function Page() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Base64 に変換して表示
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    const inputElement = document.getElementById("photo") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return (
    <div className='w-[370px] p-3 rounded-[20px]'>
      <form className='space-y-4'>
        {/* タイトル */}
        <div>
          <label
            htmlFor='title'
            className='block text-[#9D7858] text-[24px] mb-2 font-bold'
          >
            タイトル
          </label>
          <input
            id='title'
            type='text'
            className='w-[341px] h-[36px] rounded-[18px] border-[#9D7858] border p-2 '
          />
        </div>

        {/* 写真アップロード */}
        <div>
          <label
            htmlFor='photo'
            className='block text-[14px] mb-2 font-bold text-[#9D7858]'
          >
            写真
          </label>

          {/* アップロードボタン */}
          <div
            onClick={() => document.getElementById("photo")?.click()}
            className='w-[341px] h-[67px]  border  p-6 text-center cursor-pointer  rounded-[18px] border-[#9D7858] text-[#9D7858] font-bold text-[14px]'
          >
            写真をアップロード
          </div>

          <input
            id='photo'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />

          {/* 画像プレビュー */}
          {image && (
            <div className='mt-4 relative'>
              <img
                src={image}
                alt='Uploaded'
                className='w-full max-h-64 object-cover rounded-md border shadow-md'
              />
              <button
                type='button'
                onClick={handleRemoveImage}
                className='absolute top-2 right-2 bg-[#9D7858] text-white text-xs px-2 py-1 rounded-md'
              >
                削除
              </button>
            </div>
          )}
        </div>

        {/* コメント */}
        <div>
          <label
            htmlFor='comment'
            className='block text-[14px] mb-2 font-bold text-[#9D7858]'
          >
            コメント
          </label>
          <textarea
            id='comment'
            className='w-[341px] h-[156px] border p-2 min-h-[120px] rounded-[18px] border-[#9D7858]'
          />
        </div>
      </form>
    </div>
  );
}
