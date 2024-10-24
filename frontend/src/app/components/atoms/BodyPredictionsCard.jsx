import LogoBarcelona from '../../../assets/barcelona.png';
import LogoOsasuna from '../../../assets/osasuna.png';

function pointsClasses(status) {
  switch (status) {
    case 'lose':
      return 'text-grayWaki line-through';
    case 'win':
      return 'text-blueWaki';
    case 'pending':
      return 'text-purpleWaki';
    default:
      return 'text-blueWaki';
  }
}

const getTeamName = (selectedOption, localTeam, visitorTeam) => {
  return selectedOption === 'LOCAL'
    ? localTeam.name
    : selectedOption === 'AWAY'
      ? visitorTeam.name
      : 'Empate';
};

export function BodyPredictionsCard({
  selected,
  team1,
  team2,
  points,
  status,
}) {
  const pointsClass = pointsClasses(status);
  const userSelected = getTeamName(selected, team1, team2);

  return (
    <div className="grid grid-cols-[1fr_1fr_50px] items-center p-4">
      {/* Resultado */}
      <div className="flex flex-col">
        <p className="text-regular-12 text-grayWaki">Resultado final:</p>
        <p className="text-regular-16 text-label">{userSelected}</p>
      </div>

      {/* Equipos */}
      <div className="flex flex-col gap-1 text-regular-12 text-grayWaki">
        <div className="flex items-center gap-2">
          <img src={team1.logoUrl || LogoBarcelona} alt="Logo" width={'18px'} />
          <p>{team1.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={team2.logoUrl || LogoOsasuna} alt="Logo" width={'18px'} />
          <p>{team2.name}</p>
        </div>
      </div>

      {/* Puntos */}
      <p className={`text-center text-medium-18 font-medium ${pointsClass}`}>
        {points}
      </p>
    </div>
  );
}

export function BodyYourPredictionsCard({ result, points, status }) {
  const pointsClass = pointsClasses(status);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center p-4">
      {/* Resultado */}
      {points > 0 ? (
        <div className="flex flex-col">
          <p className="text-regular-12 text-grayWaki">Resultado final:</p>
          <p className="text-regular-16 text-label">{result}</p>
        </div>
      ) : (
        <div className="flex flex-col text-regular-14">
          <p className="text-label">No hiciste predicciones</p>
          <p className="text-grayLightWaki">Suerte la próxima</p>
        </div>
      )}

      {/* Puntos */}
      <p className={`text-center text-regular-16 font-medium ${pointsClass}`}>
        {points} puntos
      </p>
    </div>
  );
}
