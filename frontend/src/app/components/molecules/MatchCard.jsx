import { useState, useEffect, useContext } from 'react';
import { MatchContext } from '../../context/MatchContext';
import { Link } from 'react-router-dom';
import { MdOutlineSignalCellularAlt } from 'react-icons/md';

export default function MatchCard({ matchData }) {
  const { setSelectedMatch } = useContext(MatchContext);
  const { localTeam, visitorTeam, score, predictions, startTime, status } =
    matchData;
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

  const handleClick = () => {
    setSelectedMatch(matchData);
  };

  return (
    <div className="relative grid grid-rows-[1fr_auto_auto] gap-2 bg-grayCard px-4 py-5">
      {/* Fila 1: Escudos y marcador */}
      <Link to="/match/details" onClick={handleClick}>
        <div className="grid grid-cols-3 items-center">
          {/* Escudo local */}
          <figure className="h-14">
            <img
              src={localTeam.logoUrl}
              alt={`${localTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </figure>

          {/* Marcador o VS */}
          <div className="flex flex-col items-center">
            {hasStarted || status === 'IN_PLAY' ? (
              <>
                <MdOutlineSignalCellularAlt className="h-5 w-5 font-semibold text-purpleWaki" />
                <p className="text-semibold-22 font-semibold text-label">
                  {score ? score : '0 - 0'}
                </p>
              </>
            ) : (
              <p className="text-semibold-22 font-semibold text-label">vs</p>
            )}
          </div>

          {/* Escudo visitante */}
          <figure className="h-14">
            <img
              src={visitorTeam.logoUrl}
              alt={`${visitorTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </figure>
        </div>
      </Link>
      {/* Fila 2: Nombres y estado del partido */}
      <div className="grid grid-cols-3 items-center">
        {/* Nombre del equipo local */}
        <p className="text-balance text-center text-regular-12 text-grayWaki">
          {localTeam.name.replace(' FC', '')}
        </p>

        {/* Estado del partido (Finalizado, Tiempo, Horario) */}
        <div className="flex flex-col items-center">
          {status === 'TIMED' && !hasStarted ? (
            <p className="text-[10.35px] text-grayWaki">
              {new Date(startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          ) : status === 'FINISHED' ? (
            <p className="text-[10.35px] text-grayWaki">FT</p>
          ) : (
            <p className="flex items-center text-[10.35px]">
              {elapsedTime !== 'FT' && (
                <span className="mr-1 h-2 w-2 animate-blink rounded-full bg-redWaki"></span>
              )}
              En juego
            </p>
          )}
        </div>

        {/* Nombre del equipo visitante */}
        <p className="text-balance text-center text-regular-12 text-grayWaki">
          {visitorTeam.name.replace(' FC', '')}
        </p>
      </div>

      {/* Fila 3: Botones de predicción */}
      <div className="grid grid-cols-3 justify-center">
        <div className="flex w-full justify-center">
          <button
            className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.21px] border border-black border-opacity-5 bg-white text-regular-12 shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
            style={{ borderWidth: '0.52px' }}
          >
            {predictions.localWin}
          </button>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.21px] border border-black border-opacity-5 bg-white text-regular-12 shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
            style={{ borderWidth: '0.52px' }}
          >
            {predictions.draw}
          </button>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.21px] border border-black border-opacity-5 bg-white text-regular-12 shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
            style={{ borderWidth: '0.52px' }}
          >
            {predictions.visitorWin}
          </button>
        </div>
      </div>
    </div>
  );
}
