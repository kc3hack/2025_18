import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import MyPost from "./MyPost"; // MyPost コンポーネントをインポート
import OtherPost from "./OtherPost"; // OtherPost コンポーネントをインポート

function ToggleSwitch() {
  const [activeTab, setActiveTab] = useState<"your" | "other">("your");
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className='w-full relative'>
      <h2 className='mb-6 text-center text-[32px] font-semibold'>
        {user.fullName}
      </h2>
      {/* 🔹 タブ切り替え部分 */}
      <div className='relative flex flex-col items-center w-full'>
        <div className='relative flex items-center justify-center w-full'>
          <button
            onClick={() => setActiveTab("your")}
            className={`relative text-[20px] font-semibold py-2 text-center transition-colors text-black
            border-b-4 w-[50%] border-[#E8CF8F] 
            ${activeTab === "your" ? "text-[#8B6E4F]" : "text-[#D3B594]"}`}
          >
            Your
          </button>

          <div className='relative z-[100]'>
            <div className='absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 text-center'>
              <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#B69676] text-white absolute left-[-40px] top-[-12px]'>
                <button>
                  <a href='/Post'>
                    <svg
                      width='60'
                      height='60'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 2V22M2 12H22'
                        stroke='white'
                        strokeWidth='3'
                        strokeLinecap='round'
                      />
                    </svg>
                  </a>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("other")}
            className={`relative text-[20px] font-semibold py-2 text-center transition-colors text-black
            border-b-4 w-[50%] border-[#E8CF8F] 
            ${activeTab === "other" ? "text-[#8B6E4F]" : "text-[#D3B594]"}`}
          >
            Other
          </button>
        </div>

        {/* 🔹 濃い目の横線（Your と Other の下に配置） */}
        <div className='relative w-full flex justify-center mt-[-4px]'>
          <div
            className='absolute w-[119px] bg-[#9D7858] transition-all duration-300 ease-in-out h-[8px] rounded-[4px]'
            style={{
              left: activeTab === "your" ? "25%" : "75%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
      {/* 🔹 タブの下の余白を増やす */}
      <div className='mt-8'></div> {/* 余白を増やすための追加 */}
      {/* 🔹 タブの下にコンポーネントを切り替えて表示 */}
      <div className='mt-20 flex justify-center'>
        {" "}
        {/* 🔹 中央揃えにする */}
        <div className='w-full max-w-[400px]'>
          {" "}
          {/* 🔹 コンポーネントの幅を制限 */}
          {activeTab === "your" ? <MyPost /> : <OtherPost />}
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
