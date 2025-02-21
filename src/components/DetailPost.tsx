import { useUser } from "@clerk/nextjs";

function DetailPostCard({ post }: { post: any }) {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className='w-[370px] border border-[#9D7858] rounded-[20px] bg-white p-4'>
      {/* Header */}
      <div className='flex items-center gap-2 p-2'>
        {/* userのicon */}
        <div className='h-[40px] w-[40px] rounded-full bg-blue-300 overflow-hidden'>
          <img
            src={user.imageUrl}
            alt='User Avatar'
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <div className='text-sm text-[#9D7858] font-semibold'>
            {user.fullName}
          </div>
          <div className='text-[#9D7858] font-bold text-[24px]'>
            {post.title}
          </div>
        </div>
      </div>

      {/* 画像 */}
      <div className='flex justify-center'>
        <div className='aspect-video w-[100%] bg-blue-100'>
          <img
            src={`https://otypvnepeosuobpszuey.supabase.co/storage/v1/object/public/PostImage/${post.image}`}
            alt='Post Image'
            className='w-full h-full object-cover aspect-video z-10'
          />
        </div>
      </div>

      {/* Location */}
      <div className='flex items-center px-2 py-1'>
        <a
          href={post.mapurl}
          className='text-[#9D7858] font-semibold text-[16px]'
        >
          📍 {post.title}の場所はこちら
        </a>
      </div>

      {/* Comments */}
      <div className='w-[350px] mx-auto'>
        <p className='text-sm text-[#9D7858] p-1 font-semibold'>
          {post.text || "コメントがありません"}
        </p>
      </div>
    </div>
  );
}

export default DetailPostCard;
