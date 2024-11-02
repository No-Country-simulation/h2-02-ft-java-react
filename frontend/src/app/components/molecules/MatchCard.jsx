import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSignalCellularAlt } from 'react-icons/md';
import { formatDateNav, formatMatchTime } from '../../utils/dateUtils';
import { useMatch } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { getPredictionExistenceByMatchId } from '../../services/predictionService';

export default function MatchCard({
  matchData,
  handleSelectMatch,
  isCombined,
}) {
  const { selectMatch } = useMatch();
  const { openModal, setSelectedOption } = useModal();
  const { userId } = useAuth();
  const { localTeam, visitorTeam, score, odds, startTime, status } = matchData;
  const [hasStarted, setHasStarted] = useState(false);
  const [predictionExists, setPredictionExists] = useState(false);

  // Verificación de existencia de predicción
  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const data = await getPredictionExistenceByMatchId(
          userId,
          matchData.id
        );
        setPredictionExists(data);
      } catch (error) {
        console.error('Error al obtener la predicción:', error);
      }
    };
    fetchPredictionData();
  }, [userId, matchData.id]);

  // Determina si el partido ha comenzado
  useEffect(() => {
    const now = new Date();
    const start = new Date(startTime);
    setHasStarted(now >= start);
  }, [startTime]);

  const handleClickDetails = () => {
    selectMatch(matchData);
    handleSelectMatch?.(); // Llama a handleSelectMatch si está definido
  };

  const handleClickPay = (option) => {
    selectMatch(matchData);
    setSelectedOption(option);
  };

  const isDisabled =
    predictionExists || status === 'FT' || odds.localWin === 'N/A';

  return (
    <div className="relative grid grid-rows-[1fr_auto_auto] gap-2 bg-grayCard px-4 py-5">
      {/* Fila 1: Escudos y marcador */}
      {isCombined ? (
        <button
          onClick={handleClickDetails}
          disabled={isDisabled}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          <TeamScoreSection
            localTeam={localTeam}
            visitorTeam={visitorTeam}
            score={score}
            status={status}
            startTime={startTime}
          />
        </button>
      ) : (
        <Link to="/match/details" onClick={handleClickDetails}>
          <TeamScoreSection
            localTeam={localTeam}
            visitorTeam={visitorTeam}
            score={score}
            status={status}
            startTime={startTime}
          />
        </Link>
      )}

      {/* Fila 2: Nombres y estado del partido */}
      <TeamNamesStatusSection
        localTeam={localTeam}
        visitorTeam={visitorTeam}
        status={status}
        startTime={startTime}
      />

      {/* Fila 3: Botones de predicción */}
      <PredictionButtons
        odds={odds}
        onClick={handleClickPay}
        openModal={openModal}
        disabled={isDisabled}
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
  startTime,
}) {
  return (
    <div className="grid grid-cols-3 items-center">
      <TeamLogo logoUrl={localTeam.logoUrl} alt={localTeam.name} />
      <div className="flex flex-col items-center">
        {status === 'NS' ? (
          <>
            <MdOutlineSignalCellularAlt className="h-5 w-5 text-grayWaki" />
            <p className="text-semibold-22 font-semibold text-label">
              {formatMatchTime(startTime)}
            </p>
          </>
        ) : status === 'FT' ? (
          <>
            <MdOutlineSignalCellularAlt className="h-5 w-5 text-purpleWaki" />
            <p className="text-semibold-22 font-semibold text-label">{score}</p>
          </>
        ) : (
          <>
            <MdOutlineSignalCellularAlt className="h-5 w-5 animate-blink text-blueWaki" />
            <p className="text-semibold-22 font-semibold text-label">{score}</p>
          </>
        )}
      </div>
      <TeamLogo logoUrl={visitorTeam.logoUrl} alt={visitorTeam.name} />
    </div>
  );
}

// Componente para el nombre y estado del partido
function TeamNamesStatusSection({ localTeam, visitorTeam, status, startTime }) {
  return (
    <div className="grid grid-cols-3 items-center">
      <p className="text-balance text-center text-regular-12 text-grayWaki">
        {localTeam.name}
      </p>
      <div className="flex flex-col items-center">
        {status === 'NS' ? (
          <p className="text-[10.35px] text-grayWaki">
            {formatDateNav(startTime)}
          </p>
        ) : status === 'FT' ? (
          <p className="text-[10.35px] text-grayWaki">FT</p>
        ) : (
          <p className="text-[10.35px] text-grayWaki">En juego</p>
        )}
      </div>
      <p className="text-balance text-center text-regular-12 text-grayWaki">
        {visitorTeam.name}
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
