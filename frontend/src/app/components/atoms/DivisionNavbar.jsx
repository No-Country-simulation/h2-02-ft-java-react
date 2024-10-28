import { useState, useEffect } from 'react';

export default function DivisionNavbar({ currentView, onViewChange }) {
  const [underlinePosition, setUnderlinePosition] = useState('left'); // Por defecto en 'Ranking'

  useEffect(() => {
    const tabData = {
      ranking: 'left',
      rewards: 'center',
      quests: 'right',
    };

    setUnderlinePosition(tabData[currentView]);
  }, [currentView]);

  const handleTabClick = (tab) => {
    const tabData = {
      ranking: 'left',
      rewards: 'center',
      quests: 'right',
    };

    setUnderlinePosition(tabData[tab]);
    onViewChange(tab); // Notificar al HeaderDivision sobre la vista seleccionada
  };

  return (
    <>
      <nav className="grid grid-cols-3 pt-5 text-center">
        <button
          onClick={() => handleTabClick('ranking')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'left'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => handleTabClick('rewards')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'center'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Rewards
        </button>
        <button
          onClick={() => handleTabClick('quests')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'right'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Quests
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
