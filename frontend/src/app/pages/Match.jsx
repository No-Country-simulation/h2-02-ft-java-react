import { useLocation, Outlet } from 'react-router-dom';
import HeaderMatch from '../components/molecules/HeaderMatch';
import Searchbar from '../components/molecules/Searchbar';
import MatchList from '../components/organisms/MatchList';
import FooterNavbar from '../components/organisms/FooterNavbar';
import AnchorButton from '../components/atoms/AnchorButton';
import ModalPredictions from '../components/organisms/ModalPredictions'; // Importar el Modal
import { useModal } from '../context/ModalContext'; // Importar el contexto del modal

export default function Match() {
  const location = useLocation();
  const { isModalOpen, closeModal } = useModal(); // Obtener estado del modal

  return (
    <main className="relative flex min-h-screen w-full flex-col sm:min-w-[570px] sm:overflow-hidden">
      {location.pathname === '/match' && (
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

      {isModalOpen && (
        <ModalPredictions
          isOpen={isModalOpen}
          onClose={closeModal}
          initialStep={1}
        />
      )}
    </main>
  );
}
