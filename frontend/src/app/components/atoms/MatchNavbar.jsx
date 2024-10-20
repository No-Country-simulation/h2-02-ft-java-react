import { useState, useContext } from 'react';
import { DateContext } from '../../context/DateContext';

// Función para ajustar la fecha actual según un número de días
const adjustDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export default function MatchNavbar() {
  const { updateDate, formatDateNav } = useContext(DateContext);

  const today = adjustDate(0);
  const yesterday = adjustDate(-1);
  const tomorrow = adjustDate(1);

  const [underlinePosition, setUnderlinePosition] = useState('center');

  const handleTabClick = (tab) => {
    const tabData = {
      yesterday: { position: 'left', date: yesterday },
      today: { position: 'center', date: today },
      tomorrow: { position: 'right', date: tomorrow },
    };

    const { position, date } = tabData[tab];

    setUnderlinePosition(position);
    updateDate(date);
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
          {formatDateNav(yesterday)}
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
          {formatDateNav(tomorrow)}
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
