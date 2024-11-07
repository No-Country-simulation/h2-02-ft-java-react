import { FaArrowLeftLong } from 'react-icons/fa6';

export default function PageNavbar({ beforePage, titlePage }) {
  const handleBack = () => {
    let url;
    switch (beforePage) {
      case 'Perfil':
        url = '/profile';
        break;
      case 'Divisiones':
        url = '/divisions';
        break;
      case 'Scout players':
        url = '/scout-players';
        break;
      default:
        url = '/';
        break;
    }
    window.location.href = url;
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-white px-4 shadow-md">
      <div
        className="absolute left-4 top-1/2 flex -translate-y-1/2 transform cursor-pointer items-center text-regular-14 text-blueWaki"
        onClick={handleBack}
      >
        <FaArrowLeftLong className="mr-2" />
        {beforePage}
      </div>
      <div className="flex-grow text-center text-semibold-22 font-semibold text-blueWaki">
        {titlePage}
      </div>
    </div>
  );
}
