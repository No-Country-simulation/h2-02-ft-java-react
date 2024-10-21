import { useLocation, Outlet } from 'react-router-dom';
import HeaderMatch from '../components/molecules/HeaderMatch';
import Searchbar from '../components/molecules/Searchbar';
import MatchList from '../components/organisms/MatchList';
import FooterNavbar from '../components/organisms/FooterNavbar';
import AnchorButton from '../components/atoms/AnchorButton';

export default function Match() {
  const location = useLocation();

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden sm:min-w-[570px]">
      {location.pathname !== '/match/mypredictions' && (
        <>
          <HeaderMatch />
          <Searchbar placeholder="Buscar equipo" />
          <div className="flex items-center justify-between px-5 pb-5">
            <h2 className="text-regularNav-16 text-label">Ligas</h2>
            <AnchorButton to="/match/mypredictions">
              Mis predicciones
            </AnchorButton>
          </div>
          <MatchList />
        </>
      )}
      <Outlet />
      <FooterNavbar />
    </main>
  );
}
