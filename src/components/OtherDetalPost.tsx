import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getDbUserId } from "@/features/getUserId";
import { judgeComment } from "@/features/judgeComment";

function OtherDetailPost({ post }: { post: any }) {

  const [commentdata,setCommentdata] = useState<any[]|null>();
  const [times,setTimes] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useUser(); // 🔹 ここで useUser() を正しく使う

  const openPost = (postId: number) => {
    router.push(`comment?postId=${postId}`)
  };
  useEffect(()=>{
    const fetchdata = async() =>{
      const id = await getDbUserId()
      const comment = await judgeComment(post.id,id);
      setTimes(comment);
    }
    fetchdata();
  },[])

  return (
    <div className='w-[370px] border border-[#9D7858] rounded-[20px] bg-white p-4'>
      {/* Header */}
      <div className='flex items-center gap-2 p-2'>
        {/* 投稿者のアイコン */}
        <div className='h-[40px] w-[40px] rounded-full bg-blue-300 overflow-hidden'>
          <img
            src={post.user?.imageUrl || null} // 投稿者の `icon` を使用
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <div className='text-sm text-[#9D7858] font-semibold'>
            {post.user?.fullName || post.user?.full_name || "Unknown user"}
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
            src={post.image}
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
          📍 場所はこちら
        </a>
      </div>
      <div className='w-[340px] mx-auto'>
        <p className='text-sm text-[#9D7858] p-1 font-semibold'>
          {post.text || "コメントがありません"}
        </p>
      </div>

      <div className="flex justify-center items-center mt-1">
        <button 
          className={`w-[178px] h-[50px] bg-[#E8CF8F] text-white text-[24px] font-bold rounded-full ${times ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => openPost(post.id)}
          disabled={times} // times が true のときボタンを無効化
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default OtherDetailPost;
