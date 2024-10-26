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
  const goals = false;
  return (
    <div className="grid grid-rows-2 items-center gap-2 px-4 py-3">
      {/* Equipos */}
      <div className="grid grid-cols-[1fr,auto,1fr] items-center justify-center gap-1 text-regular-12 text-grayWaki">
        <div className="flex items-center justify-end gap-2">
          <p className="font-medium text-label">{team1.name}</p>
          <img src={team1.logoUrl || LogoBarcelona} alt="Logo" width={'18px'} />
        </div>
        <p className="text-grayLightWaki">vs.</p>
        <div className="flex items-center gap-2">
          <img src={team2.logoUrl || LogoOsasuna} alt="Logo" width={'18px'} />
          <p className="font-medium text-label">{team2.name}</p>
        </div>
      </div>
      {/* Resultado */}
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr,50px]">
          <p className="text-regular-12 text-grayWaki">
            Resultado final:{' '}
            <span className="text-regular-14 text-label">{userSelected}</span>
          </p>
          <p
            className={`text-center text-regular-16 font-medium ${pointsClass}`}
          >
            {points}
          </p>
        </div>
        {goals && (
          <div className="grid grid-cols-[1fr,50px]">
            <p className="text-regular-12 text-grayWaki">
              Goles:{' '}
              <span className="text-regular-14 text-label">Lionel Messi</span>
            </p>
            <p
              className={`text-center text-regular-16 font-medium ${pointsClass}`}
            >
              {points}
            </p>
          </div>
        )}
      </div>
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

export function BodySelectPredictionsCard({ team1, team2 }) {
  return (
    <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center justify-center gap-2 px-4 py-5 text-regular-14 text-grayWaki">
      <div className="flex items-center justify-end gap-2">
        <p className="text-balance text-grayWaki">{team1.name}</p>
        <img src={team1.logoUrl || LogoBarcelona} alt="Logo" width={'28px'} />
      </div>
      <p className="text-regular-16 text-purpleWaki">vs.</p>
      <div className="flex items-center gap-2">
        <img src={team2.logoUrl || LogoOsasuna} alt="Logo" width={'28px'} />
        <p className="text-balance text-grayWaki">{team2.name}</p>
      </div>
    </div>
  );
}
