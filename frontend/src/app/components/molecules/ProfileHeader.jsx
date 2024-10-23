import { IoSettingsOutline } from 'react-icons/io5';
import { IoPersonCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function ProfileHeader({ photo, firstName, lastName }) {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/profile/setting');
  };

  return (
    <div className="relative flex h-[230px] items-center justify-center rounded-b-[25px] bg-gradient-to-b from-[#551A99] to-[#317EF4]">
      <IoSettingsOutline
        className="absolute right-8 top-2.5 h-9 w-9 cursor-pointer text-[#F8F8F8]"
        onClick={handleSettingsClick}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-[89px] w-[89px] items-center justify-center overflow-hidden rounded-full bg-black bg-opacity-50">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-white bg-opacity-50">
              <IoPersonCircle className="h-[112px] w-[112px] text-black" />
            </div>
          )}
        </div>
        <div className="mt-[30px] text-[18px] text-[#FFFFFF]">
          {firstName || lastName ? `${firstName} ${lastName}` : 'Undefined'}
        </div>
      </div>
    </div>
  );
}
