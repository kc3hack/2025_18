import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getComment } from "@/features/getComment";
import { getUserIcon } from "@/features/getUserIcon";

function DetailPostCard({ post, onClose }: { post: any; onClose: () => void }) {
  const { user } = useUser();
  if (!user) return null;

  const [replys, setReplys] = useState<any[]>([]);
  const [userIcons, setUserIcons] = useState<any>({});

  useEffect(() => {
    const fetchdata = async () => {
      const reply_data = await getComment(post.id);
      if (reply_data != null && reply_data != undefined) {
        setReplys(reply_data);

        const userIconPromises = reply_data.map(async (reply: any) => {
          const userData = await getUserIcon(reply.user_id);
          return { userId: reply.user_id, ...userData };
        });

        const userIconData = await Promise.all(userIconPromises);
        const iconDataMap = userIconData.reduce((acc: any, userData: any) => {
          acc[userData.userId] = {
            icon: userData.icon,
            username: userData.username,
          };
          return acc;
        }, {});

        setUserIcons(iconDataMap);
      }
    };
    fetchdata();
  }, [post.id]);

  return (
    <div className='relative z-100 w-[370px] border border-[#9D7858] rounded-[20px] bg-white p-4'>
      {/* バツボタン（右上・大きく） */}
      <button
        className='absolute top-3 right-3 text-3xl p-2 cursor-pointer opacity-60'
        onClick={onClose} // モーダルを閉じる処理
      >
        ✕
      </button>

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

        <div className='flex flex-col'>
          <div className='text-sm text-[#9D7858] font-semibold'>
            {user.fullName}
          </div>
          <div className='text-[#9D7858] font-bold text-[24px]'>
            {post.title}
          </div>
        </div>
      </div>

      {/* 画像 */}
      <div className='flex justify-center mb-4'>
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
          📍場所はこちら
        </a>
      </div>

      <div className='w-[340px] mx-auto'>
        <p className='text-sm text-[#9D7858] p-1 font-semibold mx-auto'>
          {post.text || "コメントがありません"}
        </p>
      </div>

      <div className='w-[80%] h-[3px] bg-[#E8CF8F] mt-6 mx-auto'></div>

      <div className='w-[335px] mx-auto space-y-6 mt-4'>
        {replys.map((reply, index) => (
          <div key={reply.id}>
            <div className='flex items-center gap-2 p-2 mb-1'>
              <div className='h-[35px] w-[35px] rounded-full bg-blue-300 overflow-hidden'>
                <img
                  src={userIcons[reply.user_id]?.icon || "/default-avatar.png"}
                  alt='User Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <div className='text-sm text-[#9D7858] font-semibold'>
                  {userIcons[reply.user_id]?.username || "Unknown User"}
                </div>
              </div>
            </div>

            {/* 画像 */}
            <div className='flex justify-center mb-4'>
              <div className='aspect-video w-[100%] bg-blue-100'>
                <img
                  src={replys[index].reply_image}
                  alt='Post Image'
                  className='w-full h-full object-cover aspect-video z-10'
                />
              </div>
            </div>
            <div className='w-[340px] mx-auto'>
              <p className='text-sm text-[#9D7858] p-1 font-semibold mx-auto'>
                {replys[index].comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPostCard;
