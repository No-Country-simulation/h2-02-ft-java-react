import MatchNavbar from '../components/molecules/MatchNavbar';
import Searchbar from '../components/molecules/Searchbar';
import MatchList from '../components/organisms/MatchList';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Match() {
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const updateList = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    console.log('Fecha seleccionada:', formattedDate);
  };

  return (
    <main className="flex w-full flex-col overflow-hidden bg-white sm:m-2 sm:w-[390px] sm:border sm:border-inputBorder">
      <div className="relative flex w-full items-center justify-center text-[22px] font-semibold normal-case text-blueWaki">
        <button className="absolute right-2 h-9 w-9 p-1">
          <IoCalendarClearOutline />
        </button>
        <span className="">Partidos</span>
      </div>
      <MatchNavbar updateList={updateList} />
      <Searchbar placeholder="Buscar equipo" />
      <div></div>
      <MatchList />
    </main>
  );
}
