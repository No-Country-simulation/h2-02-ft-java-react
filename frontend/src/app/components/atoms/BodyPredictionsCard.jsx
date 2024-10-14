import LogoBarcelona from '../../../assets/barcelona.png';
import LogoOsasuna from '../../../assets/osasuna.png';

export default function BodyPredictionsCard({
  result,
  team1,
  team2,
  points,
  status,
}) {
  // Determinamos las clases de estilo de points según el status
  const pointsClasses = (() => {
    switch (status) {
      case 'lose':
        return 'text-grayWaki line-through'; // Puntos tachados en caso de fallo
      case 'win':
        return 'text-blueWaki'; // Puntos en azul para el estado win
      case 'pending':
        return 'text-purpleWaki'; // Puntos en púrpura para estado pendiente
      default:
        return '';
    }
  })();

  return (
    <div className="grid grid-cols-[1fr_1fr_50px] items-center p-4">
      {/* Resultado */}
      <div className="flex flex-col">
        <p className="text-regular-12 text-grayWaki">Resultado final:</p>
        <p className="text-regular-16 text-label">{result}</p>
      </div>

      {/* Equipos */}
      <div className="flex flex-col gap-1 text-regular-12 text-grayWaki">
        <div className="flex items-center gap-2">
          <img src={LogoBarcelona} alt="Logo" width={'18px'} />
          <p>{team1}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={LogoOsasuna} alt="Logo" width={'18px'} />
          <p>{team2}</p>
        </div>
      </div>

      {/* Puntos */}
      <p className={`text-center text-medium-18 font-medium ${pointsClasses}`}>
        {points}
      </p>
    </div>
  );
}
