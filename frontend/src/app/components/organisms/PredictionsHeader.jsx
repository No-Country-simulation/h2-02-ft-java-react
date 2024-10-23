import { Link } from 'react-router-dom';
import PredictionsNavbar from '../atoms/PredictionsNavbar';
import { BsArrowLeft } from 'react-icons/bs';
import PredictionsMatch from '../atoms/PredictionsMatch';

export default function PredictionsHeader({
  underlinePosition,
  setUnderlinePosition,
}) {
  return (
    <div className="relative w-full shadow-[0_0_10.2px_0_rgba(0,0,0,0.2)]">
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

      {/* Pestañas de selección de fecha */}
      <PredictionsNavbar
        underlinePosition={underlinePosition}
        setUnderlinePosition={setUnderlinePosition}
      />
    </div>
  );
}
