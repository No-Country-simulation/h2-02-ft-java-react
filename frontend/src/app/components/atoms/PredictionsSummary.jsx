import { useState } from 'react';
import { BodyPredictionsCard } from './BodyPredictionsCard';
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md';

export default function PredictionsSummary({
  selected,
  team1,
  team2,
  points,
  status,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };
  const finalPoints = points + 10;

  return (
    <section className="flex w-full flex-col items-center divide-y pt-5">
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
        className={`w-full overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <BodyPredictionsCard
          selected={selected}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
        <BodyPredictionsCard
          selected={selected}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
        <BodyPredictionsCard
          selected={selected}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
        <BodyPredictionsCard
          selected={selected}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
        <BodyPredictionsCard
          selected={selected}
          team1={team1}
          team2={team2}
          points={points}
          status={status}
        />
      </div>

      {/* Puntos totales */}
      <div className="grid w-full grid-cols-[1fr_50px] p-4 text-medium-18 font-medium text-blueWaki">
        <p>Puntos totales</p>
        <p className="text-center">{finalPoints}</p>
      </div>
    </section>
  );
}
