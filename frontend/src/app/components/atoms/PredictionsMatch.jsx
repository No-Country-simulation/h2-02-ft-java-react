import { useState, useEffect, useContext } from 'react';
import { MatchContext } from '../../context/MatchContext';

export default function PredictionsMatch() {
  const { selectedMatch } = useContext(MatchContext);
  if (!selectedMatch)
    return <p className="text-center">No hay datos del partido.</p>;

  const { localTeam, visitorTeam, score, startTime, status } = selectedMatch;
  const [elapsedTime, setElapsedTime] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startTime);
      const now = new Date();
      const diff = Math.floor((now - start) / 1000);

      if (now >= start) {
        setHasStarted(true);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        if (minutes >= 90) {
          setElapsedTime('FT');
          clearInterval(interval);
        } else {
          setElapsedTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }
      } else {
        setHasStarted(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-1">
      {/* Fila 1: Escudos y estado del partido */}
      <div className="grid grid-cols-[1fr_100px_1fr] items-center gap-4">
        {/* Columna 1: Escudo del equipo local */}
        <div className="flex flex-col items-center">
          <figure className="h-20">
            <img
              src={localTeam.logoUrl}
              alt={`${localTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </figure>
        </div>

        {/* Columna 2: Estado del partido */}
        <div className="flex flex-col items-center">
          {status === 'TIMED' && !hasStarted ? (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                {new Date(startTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-medium-39 font-medium text-label">
                {new Date(startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </>
          ) : status === 'FINISHED' ? (
            <>
              <p className="text-medium-18 font-medium text-grayWaki">
                Finalizado
              </p>
              <p className="text-medium-39 font-medium text-label">
                {score || '0 - 0'}
              </p>
            </>
          ) : (
            <p className="text-medium-18 font-medium text-grayWaki">
              {elapsedTime !== 'FT' && (
                <span className="mr-1 h-3 w-3 rounded-full bg-redWaki"></span>
              )}
              {elapsedTime || '0 - 0'}
            </p>
          )}
        </div>

        {/* Columna 3: Escudo del equipo visitante */}
        <div className="flex flex-col items-center">
          <figure className="h-20">
            <img
              src={visitorTeam.logoUrl}
              alt={`${visitorTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </figure>
        </div>
      </div>

      {/* Fila 2: Nombres de los equipos */}
      <div className="grid grid-cols-[1fr_100px_1fr] items-center gap-4">
        {/* Columna 1: Nombre del equipo local */}
        <p className="text-balance text-center text-regular-12 text-grayWaki">
          {localTeam.name.replace(' FC', '')}
        </p>

        {/* Columna 2: Espacio en blanco */}
        <div></div>

        {/* Columna 3: Nombre del equipo visitante */}
        <p className="text-balance text-center text-regular-12 text-grayWaki">
          {visitorTeam.name.replace(' FC', '')}
        </p>
      </div>
    </div>
  );
}
