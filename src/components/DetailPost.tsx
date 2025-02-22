import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getComment } from "@/features/getComment";

function DetailPostCard({ post }: { post: any }) {
  const { user } = useUser();
  if (!user) return null;

  const [replys,setReplys] = useState<any[]>([]);


  useEffect(()=>{
    const fetchreply = async ()=>{
      const reply_data = await getComment(post.id);
      if (reply_data !=null && reply_data != undefined){
        setReplys(reply_data)
      }
    }
    fetchreply();
  },[post.id]);
  console.log("reply",replys);
  

  return (
    <div className='z-100 w-[370px] border border-[#9D7858] rounded-[20px] bg-white p-4'>
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

      <div className="w-[80%] h-[3px] bg-[#E8CF8F] mt-6 mx-auto"></div>

      <div className='w-[350px] mx-auto space-y-6'>
          {replys.map((reply, index)=>(
            <div key={reply.id}>
              <div className='flex items-center gap-2 p-2'>
                <div className='h-[35px] w-[35px] rounded-full bg-blue-300 overflow-hidden'>
                  <img
                    src={replys[index].reply_image}
                    alt='User Avatar'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div>
                  <div className='text-sm text-[#9D7858] font-semibold'>
                    {user.fullName}
                  </div>
                </div>
              </div>

              {/* 画像 */}
              <div className='flex justify-center'>
                <div className='aspect-video w-[100%] bg-blue-100'>
                  <img
                    src={replys[index].reply_image}
                    alt='Post Image'
                    className='w-full h-full object-cover aspect-video z-10'
                  />
                </div>
              </div>
              <div className="flex justify-center items-center mt-3 text-sm text-[#9D7858] font-semibold max-w-[300px] whitespace-normal mx-auto">
                {replys[index].comment}
              </div>

            </div>
        ))}
        </div>
    </div>
  );
}

export default DetailPostCard;
