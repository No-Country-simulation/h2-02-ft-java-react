import { useState } from 'react';
import { usePredictions } from '../../context/PredictionsContext';
import { BodyPredictionsCard } from './BodyPredictionsCard';
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md';

export default function PredictionsSummary({
  selected,
  homeTeam,
  awayTeam,
  points,
  status,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { predictions } = usePredictions();

  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };
  const finalPoints = parseFloat(points) * 10;

  return (
    <section className="flex w-full flex-col items-center divide-y pb-14 pt-5">
      {/* Botón para abrir/cerrar el resumen */}
      <button
        className="flex w-40 cursor-pointer items-center justify-center gap-2 rounded-t-xl border-x border-t p-2"
        onClick={toggleSummary}
      >
        {isOpen ? <MdKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
        Ver Resumen
        {isOpen ? <MdKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
      </button>

      {/* Contenido oculto que se despliega */}
      <div
        className={`w-full overflow-scroll transition-all duration-300 ${
          isOpen ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <BodyPredictionsCard
          selected={selected}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          points={points}
          status={status}
        />
        {predictions.map((prediction, index) => (
          <BodyPredictionsCard
            key={index}
            selected={prediction.expectedResult}
            homeTeam={prediction.homeTeam}
            awayTeam={prediction.awayTeam}
            points={prediction.pay}
            status="pending"
          />
        ))}
      </div>

      {/* Puntos totales */}
      <div className="grid w-full grid-cols-[1fr_50px] p-4 text-medium-18 font-medium text-blueWaki">
        <p>Puntos totales</p>
        <p className="text-center">{finalPoints}</p>
      </div>
    </section>
  );
}
