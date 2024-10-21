import { useEffect, useState, useRef, useContext } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { DateContext } from '../../context/DateContext';

export default function CalendarWaki({ closeModal, isClosing }) {
  const { selectedDate, updateDate } = useContext(DateContext);
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
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    updateDate(subMonths(selectedDate, 1)); // Actualizamos la fecha del contexto
  };

  const handleNextMonth = () => {
    updateDate(addMonths(selectedDate, 1)); // Actualizamos la fecha del contexto
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    updateDate(newDate); // Actualizamos la fecha en el contexto
    closeModal(); // Cerramos el modal
  };

  const handleMonthClick = (monthIndex) => {
    updateDate(new Date(selectedDate.getFullYear(), monthIndex, 1)); // Cambiamos el mes seleccionado
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
      className={`relative w-full max-w-md rounded-t-lg bg-white p-8 shadow-lg shadow-gray-500 ${
        isClosing ? 'animate-slideOut' : 'animate-slideIn'
      }`}
    >
      <h2 className="mb-4 text-center text-semibold-22 font-semibold text-label">
        Selecciona una fecha
      </h2>
      <div className="mb-4 flex items-center justify-between text-[14px]">
        <span
          className="flex cursor-pointer items-center text-lg font-medium"
          onClick={() => setShowMonths(!showMonths)}
        >
          {format(selectedDate, 'MMMM yyyy', { locale: es })}
          <IoIosArrowDown className="ml-2 h-6 w-6 text-blueWaki" />
        </span>
        <div>
          <button
            onClick={handlePrevMonth}
            className="mr-4 text-4xl font-bold text-blueWaki"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="text-4xl font-bold text-blueWaki"
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
                className="rounded p-2 text-center text-blueWaki hover:bg-gray-200"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-regular-12 text-grayLightWaki">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => (
          <div
            className="flex w-full items-center justify-center"
            key={day + 1}
          >
            <button
              className={`h-9 w-9 cursor-pointer p-2 text-[17.53px] ${
                selectedDate.getDate() === day + 1 &&
                selectedDate.getMonth() === new Date().getMonth()
                  ? 'rounded-full bg-purpleWaki text-white'
                  : ''
              }`}
              onClick={() => handleDateClick(day + 1)}
            >
              {day + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
