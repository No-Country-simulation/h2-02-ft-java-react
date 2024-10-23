import { Link } from 'react-router-dom';
import AnchorButton from '../atoms/AnchorButton';
import { BsArrowLeft } from 'react-icons/bs';
import MyPredictionTabs from '../molecules/MyPredictionTabs';

export default function MyPredictionsHeader() {
  return (
    <div className="w-full text-white">
      <div className="p-5 pt-8">
        {/* Botón de volver */}
        <Link to="/match">
          <div className="mb-4 flex items-center gap-2 text-regular-14">
            <BsArrowLeft className="text-lg" />
            Partidos
          </div>
        </Link>

        {/* Título de la sección */}
        <div className="text-center">
          <h1 className="mb-2 text-semibold-22 font-semibold">
            Tus predicciones
          </h1>
          <p className="text-[59px] font-medium leading-[70.8px]">5</p>
          <p className="text-regular-16 text-white/75">
            Predicciones disponibles hoy
          </p>
        </div>
      </div>

      {/* Pestañas de selección de fecha */}
      <MyPredictionTabs />

      {/* Sección de compra de predicciones */}
      <div className="p-5 pb-8">
        <div className="grid grid-cols-[1fr_auto] items-center rounded-large bg-white py-[6px] pe-2 ps-6 text-black">
          <p className="text-regular-12 leading-[16.92px] text-grayWaki">
            ¿Te quedaste sin predicciones?
          </p>
          <AnchorButton className="w-full">Comprar predicciones</AnchorButton>
        </div>
      </div>
    </div>
  );
}
