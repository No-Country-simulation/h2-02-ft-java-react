import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import FooterNavbar from '../components/organisms/FooterNavbar';
import AnchorButton from '../components/atoms/AnchorButton';

export default function Partidos() {
  const location = useLocation();

  return (
    <main className="flex min-h-screen w-full flex-col sm:min-w-[500px]">
      {location.pathname !== '/partidos/predictions' && (
        <AnchorButton to="/partidos/predictions">Mis predicciones</AnchorButton>
      )}
      <Outlet />
      <FooterNavbar />
    </main>
  );
}
