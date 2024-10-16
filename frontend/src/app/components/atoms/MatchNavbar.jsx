import { useState } from 'react';

export default function MatchNavbar({ updateList }) {
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 4);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  const [underlinePosition, setUnderlinePosition] = useState('center');

  const handleTabClick = (tab) => {
    if (tab === 'yesterday') {
      setUnderlinePosition('left');
      updateList(yesterday);
    } else if (tab === 'today') {
      setUnderlinePosition('center');
      updateList(today);
    } else if (tab === 'tomorrow') {
      setUnderlinePosition('right');
      updateList(tomorrow);
    }
  };

  return (
    <>
      <nav className="grid grid-cols-3 pt-5 text-center">
        <button
          onClick={() => handleTabClick('yesterday')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'left'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          {formatDate(yesterday)}
        </button>
        <button
          onClick={() => handleTabClick('today')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'center'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Hoy
        </button>
        <button
          onClick={() => handleTabClick('tomorrow')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'right'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          {formatDate(tomorrow)}
        </button>
      </nav>
      <span
        className={`absolute bottom-0 h-[3px] w-1/3 transform bg-blueWaki transition-all duration-500 ease-in-out ${
          underlinePosition === 'left'
            ? 'translate-x-0'
            : underlinePosition === 'center'
              ? 'translate-x-full'
              : 'translate-x-[200%]'
        }`}
      ></span>
    </>
  );
}
