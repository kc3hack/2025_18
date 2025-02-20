import { useState } from "react";

function ToggleSwitch() {
  const [activeTab, setActiveTab] = useState<"your" | "other">("your");

  return (
    <div className='w-full relative'>
      <h2 className='mb-4 text-center text-[32px] font-semibold '>UserName</h2>
      <div className='relative flex items-center justify-center w-full'>
        <button
          onClick={() => setActiveTab("your")}
          className={`relative text-[20px] font-semibold py-2 text-center transition-colors text-black
    border-b-4 w-[50%] border-[#E8CF8F] /* 幅を 50% にして左右対称に */ 
    ${activeTab === "your" ? "text-[#8B6E4F]" : "text-[#D3B594]"}`}
        >
          Your
        </button>

        <div className='relative z-[100]'>
          <div className='absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 text-center'>
            <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#B69676] text-white absolute left-[-40px] top-[-12px]'>
              <button>
              {/* SVG で + マークを作成（線を長くする） */}
              <svg
                width='60' /* SVG自体のサイズを少し大きく */
                height='60'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 2V22M2 12H22' /* ここで縦と横を長く */
                  stroke='white'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("other")}
          className={`relative text-[20px] font-semibold py-2 text-center transition-colors text-black
    border-b-4 w-[50%] border-[#E8CF8F] /* 幅を 50% にして左右対称に */
    ${activeTab === "other" ? "text-[#8B6E4F]" : "text-[#D3B594]"}`}
        >
          Other
        </button>
      </div>
      {/* 濃い目の横線（Your と Other の下に配置） */}
      <div
        className='absolute bottom-[-2px] w-[119px] bg-[#9D7858] transition-all duration-300 ease-in-out h-[8px] rounded-[4px]'
        style={{
          left: activeTab === "your" ? "25%" : "75%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

export default ToggleSwitch;
