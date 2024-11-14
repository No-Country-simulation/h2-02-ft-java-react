import { useState } from 'react';
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { usePredictions } from '../../context/PredictionsContext';
import { getTeamName } from '../../utils/predictionUtils';
import { BodyPredictionsCard } from './BodyPredictionsCard';

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

  const totalPointsPredictions =
    predictions.length > 0
      ? predictions.reduce((acc, prediction) => acc * prediction.match.pay, 1)
      : 1;

  const finalPoints =
    predictions.length > 0
      ? parseFloat(points) *
        totalPointsPredictions *
        (10 * (predictions.length + 1))
      : parseFloat(points) * 10;

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
        className={`w-full divide-y divide-blueWaki/25 overflow-scroll transition-all duration-300 ${
          isOpen ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <BodyPredictionsCard
          selected={getTeamName(selected, homeTeam, awayTeam)}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          points={parseFloat(points)}
          status={status}
        />
        {predictions.map((prediction) => {
          const homeTeam = {
            name: prediction.match.homeTeam,
            logoUrl: prediction.match.homeShield,
          };
          const awayTeam = {
            name: prediction.match.awayTeam,
            logoUrl: prediction.match.awayShield,
          };
          const expectedResult = prediction.match.expectedResult;

          return (
            <BodyPredictionsCard
              key={prediction.match.matchId}
              selected={getTeamName(expectedResult, homeTeam, awayTeam)}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              points={prediction.match.pay}
              status={status}
            />
          );
        })}
      </div>

      {/* Puntos totales */}
      <div className="grid w-full grid-cols-[1fr_50px] p-4 text-medium-18 font-medium text-blueWaki">
        <p>Puntos totales</p>
        <p className="text-center">{parseInt(finalPoints)}</p>
      </div>
    </section>
  );
}
