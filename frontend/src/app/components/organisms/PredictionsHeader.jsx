import { Link } from 'react-router-dom';
import PredictionsNavbar from '../atoms/PredictionsNavbar';
import { BsArrowLeft } from 'react-icons/bs';
import PredictionsMatch from '../atoms/PredictionsMatch';

export default function PredictionsHeader({ activeTab, setActiveTab }) {
  return (
    <header className="relative w-full shadow-navbar">
      <div className="px-5 pb-4 pt-8">
        {/* Botón de volver */}
        <Link to="/match">
          <div className="mb-8 flex items-center gap-2 text-regular-14 text-blueWaki">
            <BsArrowLeft className="text-lg" />
            Partidos
          </div>
        </Link>

        {/* Partido */}
        <PredictionsMatch />
      </div>

      {/* Pestañas de selección de sección */}
      <PredictionsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </header>
  );
}
