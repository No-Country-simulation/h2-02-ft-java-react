import { FaCheck } from 'react-icons/fa6';
import { CgCloseO } from 'react-icons/cg';
import { BiLoaderCircle } from 'react-icons/bi';

export default function StatusPredictionsCard({ status, points }) {
  let statusContent;

  // Lógica para mostrar el contenido según el estado
  switch (status) {
    case 'pending':
      statusContent = (
        <div className="flex items-center gap-2 px-4 py-2">
          <BiLoaderCircle
            className="animate-spin-slow text-purpleWaki"
            size={18}
          />
          <p className="text-regular-12 text-grayWaki">Pendiente</p>
        </div>
      );
      break;
    case 'lose':
      statusContent = (
        <div className="flex items-center gap-2 px-4 py-2">
          <CgCloseO className="text-redWaki" size={18} />
          <p className="text-regular-12 text-grayWaki">
            No ganaste puntos con esta predicción
          </p>
        </div>
      );
      break;
    case 'win':
      statusContent = (
        <div className="flex items-center gap-2 px-4 py-2">
          <FaCheck className="text-greenWaki" size={18} />
          <p className="text-regular-12 text-grayWaki">
            Ganaste {points} puntos con esta predicción
          </p>
        </div>
      );
      break;
    default:
      statusContent = null;
  }

  return statusContent;
}
