import { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function CalendarWaki({
  closeModal,
  isClosing,
  onDateSelect,
  selectedDate,
}) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [showMonths, setShowMonths] = useState(false);
  const modalRef = useRef(null);

  const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDateSelect(newDate); // Captura la fecha seleccionada
    closeModal();
  };

  const handleMonthClick = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonths(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`relative w-full max-w-md rounded-t-lg bg-white p-8 shadow-lg shadow-gray-500 ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}
    >
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Selecciona una fecha
      </h2>
      <div className="mb-4 flex items-center justify-between text-[14px]">
        <span
          className="flex cursor-pointer items-center text-lg font-medium"
          onClick={() => setShowMonths(!showMonths)}
        >
          {format(currentDate, 'MMMM yyyy', { locale: es })}
          <IoIosArrowDown className="ml-2 h-6 w-6 text-[#317EF4]" />
        </span>
        <div>
          <button
            onClick={handlePrevMonth}
            className="mr-4 text-4xl font-bold text-[#317EF4]"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="text-4xl font-bold text-[#317EF4]"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      {showMonths && (
        <div className="absolute left-0 right-0 top-16 z-10 rounded-lg bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthClick(index)}
                className="rounded p-2 text-center text-[#317EF4] hover:bg-gray-200"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-[12px] font-semibold text-[#8D8D8D]">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => (
          <div
            key={day + 1}
            className={`cursor-pointer p-2 text-[17.53px] ${selectedDate?.getDate() === day + 1 && currentDate.getMonth() === selectedDate.getMonth() ? 'rounded-full bg-[#8E2BFF] text-white' : ''}`}
            onClick={() => handleDateClick(day + 1)}
          >
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
