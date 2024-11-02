import { useMatch } from '../../context/MatchContext';
import { MdOutlineSignalCellularAlt } from 'react-icons/md';
import { formatDateNav } from '../../utils/dateUtils';

export default function PredictionsMatch() {
  const { selectedMatch } = useMatch();
  if (!selectedMatch)
    return <p className="text-center">No hay datos del partido.</p>;

  const { localTeam, visitorTeam, score, startTime, status } = selectedMatch;

  return (
    <div className="grid grid-rows-[1fr_auto] gap-1">
      {/* Fila 1: Escudos y estado del partido */}
      <div className="grid grid-cols-[1fr_100px_1fr] items-center gap-4">
        {/* Columna 1: Escudo del equipo local */}
        <div className="flex flex-col items-center">
          <TeamLogo logoUrl={localTeam.logoUrl} alt={localTeam.name} />
        </div>

        {/* Columna 2: Estado del partido */}
        <div className="flex flex-col items-center">
          {status === 'NS' ? (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                {formatDateNav(startTime)}
              </p>
              <p className="text-medium-39 font-medium text-label">
                {new Date(startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </>
          ) : status === 'FT' ? (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                Finalizado
              </p>
              <p className="text-medium-39 font-medium text-label">
                {score || '0 - 0'}
              </p>
            </>
          ) : status === 'PST' ? (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                Postergado
              </p>
              <p className="text-medium-39 font-medium text-label">
                {score || '0 - 0'}
              </p>
            </>
          ) : (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                En juego
              </p>
              <p className="text-medium-39 font-medium text-label">
                {score || '0 - 0'}
              </p>
            </>
          )}
        </div>

        {/* Columna 3: Escudo del equipo visitante */}
        <div className="flex flex-col items-center">
          <TeamLogo logoUrl={visitorTeam.logoUrl} alt={visitorTeam.name} />
        </div>
      </div>

      {/* Fila 2: Nombres de los equipos */}
      <div className="grid grid-cols-[1fr_100px_1fr] items-center gap-4">
        <TeamName name={localTeam.name} />
        <div className="flex justify-center">
          {status === 'NS' ? (
            <MdOutlineSignalCellularAlt className="h-5 w-5 text-grayWaki" />
          ) : status === 'FT' ? (
            <MdOutlineSignalCellularAlt className="h-5 w-5 text-purpleWaki" />
          ) : status === 'PST' ? (
            <MdOutlineSignalCellularAlt className="h-5 w-5 text-redWaki" />
          ) : (
            <MdOutlineSignalCellularAlt className="h-5 w-5 animate-blink text-blueWaki" />
          )}
        </div>
        <TeamName name={visitorTeam.name} />
      </div>
    </div>
  );
}

// Subcomponente para mostrar el logo del equipo
function TeamLogo({ logoUrl, alt }) {
  return (
    <figure className="h-20">
      <img
        src={logoUrl}
        alt={`${alt} Logo`}
        className="h-full w-full object-contain"
      />
    </figure>
  );
}

// Subcomponente para mostrar el nombre del equipo
function TeamName({ name }) {
  return (
    <p className="text-balance text-center text-regular-12 text-grayWaki">
      {name === 'Central Cordoba de Santiago' ? 'Central Cba (SdE)' : name}
    </p>
  );
}
