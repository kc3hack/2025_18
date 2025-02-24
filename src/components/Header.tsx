import { useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className='w-full flex flex-col items-center mx-auto'>
      <div className='relative w-full h-[217px]'>
        {/* Background container */}
        <div className='absolute inset-0 bg-[#E8CF8F]'>
          {/* Curved white overlay */}
          <div
            className='absolute bottom-0 w-full h-[87px] bg-white'
            style={{
              borderTopLeftRadius: "440px 190px",
              borderTopRightRadius: "440px 190px",
            }}
          />
        </div>
        <div className='flex justify-center items-center w-full h-full'>
          {/* Image container */}
          <div className='z-[10] w-[175px] h-[175px] rounded-full bg-gray-200'>
            <img
              src={user.imageUrl}
              alt='User Avatar'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
