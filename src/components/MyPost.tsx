import React from "react";

function MyPost() {
  return (
    <div className='w-[350px] h-[280px] rounded-[20px] overflow-hidden border border-[#9D7858] text-[#9D7858] font-semibold '>
      <div className='w-full h-[193px] bg-slate-200 '>
        {/* <Image/>  */}
        ここに画像入れる object-fit-coverみたいなcssいりそう aspect-video
      </div>
      <div className='w-full h-[87px] p-3'>
        <p className='text-[24px] mb-2 ml-2 font-semibold text-[#9D7858] '>
          タイトル
        </p>
        <a href='' className='text-[16px] text-[#9D7858] '>
          📍京都府左京区静市市原町646-7
        </a>
      </div>
    </div>
  );
}

export default MyPost;
