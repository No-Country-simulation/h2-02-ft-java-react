import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import HeaderMatch from '../components/molecules/HeaderMatch';
import Searchbar from '../components/molecules/Searchbar';
import MatchList from '../components/organisms/MatchList';
import FooterNavbar from '../components/organisms/FooterNavbar';
import AnchorButton from '../components/atoms/AnchorButton';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function Match() {
  const location = useLocation();
  const defaultDay = new Date();
  const [selectedDate, setSelectedDate] = useState(formatDate(defaultDay));

  const updateList = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    console.log('Fecha seleccionada:', formattedDate);
  };

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden sm:min-w-[500px]">
      {location.pathname !== '/match/mypredictions' && (
        <>
          <HeaderMatch updateList={updateList} />
          <Searchbar placeholder="Buscar equipo" />
          <div className="flex items-center justify-between px-5 pb-5">
            <h2 className="text-regularNav-16 text-label">Ligas</h2>
            <AnchorButton to="/match/mypredictions">
              Mis predicciones
            </AnchorButton>
          </div>
          <MatchList selectedDate={selectedDate} />
        </>
      )}
      <Outlet />
      <FooterNavbar />
    </main>
  );
}
