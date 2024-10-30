import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSignalCellularAlt } from 'react-icons/md';
import { useMatch } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { getPredictionByMatchId } from '../../services/predictionService';

export default function MatchCard({
  matchData,
  handleSelectMatch,
  isCombined,
}) {
  const { selectMatch } = useMatch();
  const { openModal, setSelectedOption } = useModal();
  const { userId } = useAuth();
  const { localTeam, visitorTeam, score, odds, startTime, status } = matchData;
  const [elapsedTime, setElapsedTime] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [predictionExists, setPredictionExists] = useState(false);

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

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const data = await getPredictionByMatchId(userId, matchData.id);
        if (data) setPredictionExists(true);
      } catch (error) {
        console.error('Error al obtener la predicción:', error);
      }
    };
    fetchPredictionData();
  }, [userId, matchData.id]);

  const handleClickDetails = () => {
    selectMatch(matchData);
    handleSelectMatch?.(); // Solo llama a handleSelectMatch si está definido
  };

  const handleClickPay = (option) => {
    selectMatch(matchData);
    setSelectedOption(option);
  };

  return (
    <div className="relative grid grid-rows-[1fr_auto_auto] gap-2 bg-grayCard px-4 py-5">
      {/* Fila 1: Escudos y marcador */}
      {isCombined ? (
        <button
          onClick={handleClickDetails}
          disabled={predictionExists || status === 'FT'}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          <TeamScoreSection
            localTeam={localTeam}
            visitorTeam={visitorTeam}
            score={score}
            status={status}
            hasStarted={hasStarted}
            elapsedTime={elapsedTime}
          />
        </button>
      ) : (
        <Link to="/match/details" onClick={handleClickDetails}>
          <TeamScoreSection
            localTeam={localTeam}
            visitorTeam={visitorTeam}
            score={score}
            status={status}
            hasStarted={hasStarted}
            elapsedTime={elapsedTime}
          />
        </Link>
      )}

      {/* Fila 2: Nombres y estado del partido */}
      <TeamNamesStatusSection
        localTeam={localTeam}
        visitorTeam={visitorTeam}
        status={status}
        startTime={startTime}
        elapsedTime={elapsedTime}
      />

      {/* Fila 3: Botones de predicción */}
      <PredictionButtons
        odds={odds}
        onClick={handleClickPay}
        openModal={openModal}
        disabled={predictionExists || status === 'FT'}
      />
    </div>
  );
}

// Componente para el escudo y marcador
function TeamScoreSection({
  localTeam,
  visitorTeam,
  score,
  status,
  hasStarted,
  elapsedTime,
}) {
  return (
    <div className="grid grid-cols-3 items-center">
      <TeamLogo logoUrl={localTeam.logoUrl} alt={localTeam.name} />
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
      <TeamLogo logoUrl={visitorTeam.logoUrl} alt={visitorTeam.name} />
    </div>
  );
}

// Componente para el nombre y estado del partido
function TeamNamesStatusSection({
  localTeam,
  visitorTeam,
  status,
  startTime,
  elapsedTime,
}) {
  return (
    <div className="grid grid-cols-3 items-center">
      <p className="text-balance text-center text-regular-12 text-grayWaki">
        {localTeam.name === 'Central Cordoba de Santiago'
          ? 'Central Cba (SdE)'
          : localTeam.name}
      </p>
      <div className="flex flex-col items-center">
        {status === 'NS' ? (
          <p className="text-[10.35px] text-grayWaki">
            {new Date(startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : status === 'FT' ? (
          <p className="text-[10.35px] text-grayWaki">FT</p>
        ) : (
          <p className="flex items-center text-[10.35px]">
            <span className="mr-1 h-2 w-2 animate-blink rounded-full bg-redWaki"></span>
            {elapsedTime}
          </p>
        )}
      </div>
      <p className="text-balance text-center text-regular-12 text-grayWaki">
        {visitorTeam.name === 'Central Cordoba de Santiago'
          ? 'Central Cba (SdE)'
          : visitorTeam.name}
      </p>
    </div>
  );
}

// Componente para los logos
function TeamLogo({ logoUrl, alt }) {
  return (
    <figure className="h-14">
      <img
        src={logoUrl}
        alt={`${alt} Logo`}
        className="h-full w-full object-contain"
      />
    </figure>
  );
}

// Componente para los botones de predicción
function PredictionButtons({ odds, onClick, openModal, disabled }) {
  const buttons = [
    { label: odds.localWin, option: 'LOCAL' },
    { label: odds.draw, option: 'DRAW' },
    { label: odds.visitorWin, option: 'AWAY' },
  ];

  return (
    <div className="grid grid-cols-3 justify-center">
      {buttons.map(({ label, option }) => (
        <div key={option} className="flex w-full justify-center">
          <button
            onClick={() => {
              openModal(2);
              onClick(option);
            }}
            disabled={disabled}
            className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.21px] border border-black border-opacity-5 bg-white text-regular-12 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderWidth: '0.52px' }}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}
