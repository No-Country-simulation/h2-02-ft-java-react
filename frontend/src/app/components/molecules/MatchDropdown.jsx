import { useState, useContext, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';
import { getMatchesToday } from '../../services/matchService';
import { DateContext } from '../../context/DateContext';

export default function MatchDropdown({ competitionInfo }) {
  const [matches, setMatches] = useState([]);
  const [activeLeague, setActiveLeague] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedDate, formatDate } = useContext(DateContext);

  // Función para obtener los partidos
  const fetchMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMatches = await getMatchesToday(
        competitionInfo.code,
        formatDate(selectedDate)
      );

      // Almacenar los partidos en el estado
      setMatches(
        fetchedMatches.map((match) => ({
          id: match.id,
          localTeam: {
            name: match.homeTeam.name.replace(/ FC$/, ''),
            logoUrl: match.homeTeam.crest,
          },
          visitorTeam: {
            name: match.awayTeam.name.replace(/ FC$/, ''),
            logoUrl: match.awayTeam.crest,
          },
          score:
            match.status === 'FINISHED'
              ? match.score.fullTime.home !== null &&
                match.score.fullTime.away !== null
                ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                : '? - ?'
              : 'vs',
          predictions: {
            localWin: match.odds.home_team,
            draw: match.odds.draw,
            visitorWin: match.odds.away_team,
          },
          startTime: match.utcDate,
          status: match.status,
        }))
      );
    } catch (error) {
      setError('Error fetching matches');
    } finally {
      setLoading(false);
    }
  };

  // useEffect para actualizar los partidos cuando cambie la fecha o se abra la liga
  useEffect(() => {
    if (activeLeague) {
      fetchMatches();
    }
  }, [selectedDate, activeLeague]); // Se ejecuta cuando cambia selectedDate o activeLeague

  const toggleLeague = () => {
    setActiveLeague(!activeLeague);
  };

  return (
    <>
      <button
        onClick={toggleLeague}
        className="flex h-14 w-full items-center justify-between bg-white px-5"
      >
        <div className="grid grid-cols-[36px_1fr] items-center gap-2">
          <img
            src={competitionInfo.emblem}
            alt={`${competitionInfo.name} emblem`}
            className="h-full w-full object-contain"
          />
          <span className="whitespace-nowrap text-regularNav-16 text-label">
            {competitionInfo.name}
          </span>
        </div>
        <div className="flex-shrink-0 transform transition-transform duration-300">
          {/* Giramos la flecha según el estado */}
          <IoIosArrowDown
            className={`text-blueWaki transition-transform duration-300 ${
              activeLeague ? 'rotate-180' : 'rotate-0'
            }`}
            size={18}
          />
        </div>
      </button>

      {/* Mostrar los partidos si la liga está activa con transición */}
      <div
        className={`transition-max-height divide-y overflow-hidden duration-500 ease-in-out ${
          activeLeague ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {/* Mostrar solo el mensaje de carga mientras se está cargando */}
        {loading && <p className="p-5 text-center">Cargando partidos...</p>}

        {/* Mostrar los partidos o el mensaje de "No hay partidos" solo cuando no esté cargando */}
        {!loading && (
          <>
            {error ? (
              <p className="p-5 text-center text-red-500">{error}</p>
            ) : matches.length === 0 ? (
              <p className="p-5 text-center">No hay partidos disponibles.</p>
            ) : (
              matches.map((match) => (
                <MatchCard key={match.id} matchData={match} />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
