function DetailPostCard() {
  return (
    <div className='w-[370px] border border-[#9D7858]   rounded-[20px]'>
      {/* Header */}
      <div className='flex items-center gap-2 p-2'>
        {/* userのiconいれる */}
        <div className='h-[40px] w-[40px] rounded-full bg-blue-300' />
        <div>
          <div className='text-sm text-[#9D7858] font-semibold'>UserName</div>
          <div className=' text-[#9D7858] font-bold text-[24px]'>タイトル</div>
        </div>
      </div>

      {/* 画像いれる */}
      <div className='flex justify-center'>
        <div className='aspect-video w-[95%] bg-blue-100'></div>
      </div>

      {/* Location */}
      <div className='flex items-center px-2 py-1 '>
        <a href='' className='text-[#9D7858] font-semibold text-[16px]'>
          📍京都府左京区静市市原町646-7
        </a>
      </div>

      {/* Comments */}
      <div className='w-[350px]  mx-auto'>
        <p className='text-sm text-[#9D7858] p-1 font-semibold '>
          コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
        </p>
      </div>
    </div>
  );
}

export default DetailPostCard;
