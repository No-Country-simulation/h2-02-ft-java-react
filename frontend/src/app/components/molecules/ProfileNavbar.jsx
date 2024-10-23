import { FaArrowLeftLong } from 'react-icons/fa6';

export default function ProfileNavbar({ beforePage, titlePage }) {
  const handleBack = () => {
    window.location.href = '/profile';
  };

  return (
    <div className="relative flex h-20 items-center justify-between bg-white px-4 shadow-md">
      <div
        className="absolute left-4 top-1/2 flex -translate-y-1/2 transform cursor-pointer items-center text-regular-14 text-[#317EF4]"
        onClick={handleBack}
      >
        <FaArrowLeftLong className="mr-2" />
        {beforePage}
      </div>
      <div className="flex-grow text-center text-semibold-22 font-semibold text-[#317EF4]">
        {titlePage}
      </div>
    </div>
  );
}
