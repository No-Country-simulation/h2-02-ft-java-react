import { useLocation, Outlet } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { useDate } from '../context/DateContext';
import HeaderMatch from '../components/molecules/HeaderMatch';
import Searchbar from '../components/molecules/Searchbar';
import MatchList from '../components/organisms/MatchList';
import FooterNavbar from '../components/organisms/FooterNavbar';
import AnchorButton from '../components/atoms/AnchorButton';
import ModalPredictions from '../components/organisms/ModalPredictions';

export default function Match() {
  const location = useLocation();
  const { isModalOpen } = useModal();
  const { updateSelectedDate } = useDate();

  return (
    <div className="flex justify-center">
      <main className="relative flex min-h-screen w-full flex-col sm:max-w-[570px] sm:overflow-hidden">
        {location.pathname === '/match' && (
          <>
            <HeaderMatch />
            <Searchbar placeholder="Buscar equipo" />
            <div className="flex items-center justify-between px-5 pb-5">
              <h2 className="text-regularNav-16 text-label">Ligas</h2>
              <AnchorButton
                to="/match/mypredictions"
                onClick={() => {
                  updateSelectedDate(new Date());
                }}
              >
                Mis predicciones
              </AnchorButton>
            </div>
            <div className="mb-[90px]">
              <MatchList />
            </div>
          </>
        )}

        <Outlet />

        <FooterNavbar />

        {isModalOpen && <ModalPredictions isOpen={isModalOpen} />}
      </main>
    </div>
  );
}
