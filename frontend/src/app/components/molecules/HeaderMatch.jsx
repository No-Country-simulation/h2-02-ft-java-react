import { useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import MatchNavbar from '../atoms/MatchNavbar';
import CalendarWaki from './CalendarWaki';

export default function HeaderMatch() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleCalendar = () => {
    if (showCalendar) {
      setIsClosing(true);
      setTimeout(() => {
        setShowCalendar(false);
        setIsClosing(false);
      }, 500);
    } else {
      setShowCalendar(true);
    }
  };

  return (
    <div className="relative shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
      <div className="relative flex w-full items-center justify-center pt-[60px] text-[22px] font-semibold normal-case text-blueWaki">
        <button
          className="absolute right-2 h-9 w-9 p-1"
          onClick={toggleCalendar}
        >
          <IoCalendarClearOutline />
        </button>
        <span>Partidos</span>
      </div>
      <MatchNavbar />
      {showCalendar && (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
        >
          <CalendarWaki closeModal={toggleCalendar} isClosing={isClosing} />
        </div>
      )}
    </div>
  );
}
