import EscudoPurple from '../../../assets/escudoPurple.svg';
import EscudoBlue from '../../../assets/escudoBlue.svg';

function pointsClasses(status) {
  switch (status) {
    case 'FAILED':
      return 'text-grayWaki line-through';
    case 'CORRECT':
      return 'text-blueWaki';
    case 'PENDING':
      return 'text-purpleWaki';
    default:
      return 'text-blueWaki';
  }
}

export function BodyPredictionsCard({
  selected,
  homeTeam,
  awayTeam,
  points,
  status,
}) {
  const pointsClass = pointsClasses(status);

  const goals = false;
  return (
    <div className="grid grid-rows-2 items-center gap-2 px-4 py-3">
      {/* Equipos */}
      <div className="grid grid-cols-[1fr,auto,1fr] items-center justify-center gap-1 text-xs text-grayWaki sm:text-base">
        <div className="flex items-center justify-end gap-2">
          <p className="text-end font-medium text-label">
            {homeTeam?.name
              ? homeTeam.name === 'Central Cordoba de Santiago'
                ? 'Central Cba (SdE)'
                : homeTeam.name
              : 'TeamPurple'}
          </p>
          <img
            src={homeTeam.logoUrl || EscudoPurple}
            alt="Logo"
            width={'18px'}
            className="sm:w-6"
          />
        </div>
        <p className="text-grayLightWaki">vs.</p>
        <div className="flex items-center gap-2">
          <img src={awayTeam.logoUrl || EscudoBlue} alt="Logo" width={'18px'} />
          <p className="font-medium text-label">
            {awayTeam?.name
              ? awayTeam.name === 'Central Cordoba de Santiago'
                ? 'Central Cba (SdE)'
                : awayTeam.name
              : 'TeamBlue'}
          </p>
        </div>
      </div>
      {/* Resultado */}
      <div className="flex flex-col pt-3">
        <div className="grid grid-cols-[1fr,50px]">
          <p className="text-regular-12 text-grayWaki">
            Mi predicción:{' '}
            <span className="text-regular-14 text-label">
              {selected === 'DRAW' ? 'Empate' : selected}
            </span>
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

export function BodyYourPredictionsCard({
  result,
  points,
  status,
  matchStatus,
}) {
  const pointsClass = pointsClasses(status);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center p-4">
      {/* Resultado */}
      {points > 0 ? (
        <div className="flex flex-col">
          <p className="text-regular-12 text-grayWaki">Mi predicción:</p>
          <p className="text-regular-16 text-label">
            {result === 'DRAW' ? 'Empate' : result}
          </p>
        </div>
      ) : (
        <div className="flex flex-col text-regular-14">
          {matchStatus !== 'FT' ? (
            <p className="text-label">Aún hiciste predicciones</p>
          ) : (
            <>
              <p className="text-label">No hiciste predicciones</p>
              <p className="text-grayLightWaki">Suerte la próxima</p>
            </>
          )}
        </div>
      )}

      {/* Puntos */}
      <p className={`text-center text-regular-16 font-medium ${pointsClass}`}>
        {points} puntos
      </p>
    </div>
  );
}
