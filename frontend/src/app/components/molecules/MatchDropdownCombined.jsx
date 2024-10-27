import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import MatchCardCombined from '../molecules/MatchCardCombined';
import { getMatchesLeagueDate } from '../../services/matchService';
import { useDate } from '../../context/DateContext';
import { formatDate } from '../../utils/dateUtils';

export default function MatchDropdownCombined({
  competitionInfo,
  handleSelectMatch,
}) {
  const [matches, setMatches] = useState([]);
  const [activeLeague, setActiveLeague] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedDate } = useDate();

  // Función para obtener los partidos
  const fetchMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMatches = await getMatchesLeagueDate(
        competitionInfo.code,
        formatDate(selectedDate)
      );
      // console.log(fetchedMatches);

      setMatches(
        fetchedMatches.map((match) => ({
          id: match.fixture.id,
          localTeam: {
            name: match.fixture.teams.home.teamName,
            logoUrl: match.fixture.teams.home.teamLogo,
          },
          visitorTeam: {
            name: match.fixture.teams.away.teamName,
            logoUrl: match.fixture.teams.away.teamLogo,
          },
          score:
            match.fixture.status.shortStatus === 'FT'
              ? match.fixture.goals.homeGoals !== null &&
                match.fixture.goals.awayGoals !== null
                ? `${match.fixture.goals.homeGoals} - ${match.fixture.goals.awayGoals}`
                : '? - ?'
              : 'vs',
          odds: {
            localWin: match.odds[0]?.bookmaker?.bet?.values.homeOdd || 'N/A',
            draw: match.odds[0]?.bookmaker?.bet?.values.drawOdd || 'N/A',
            visitorWin: match.odds[0]?.bookmaker?.bet?.values.awayOdd || 'N/A',
          },
          startTime: match.fixture.date,
          status: match.fixture.status.shortStatus,
          league: {
            id: match.fixture.league.id,
            name: match.fixture.league.name,
            logo: match.fixture.league.logo,
          },
        }))
      );
    } catch (error) {
      setError('No hay partidos disponibles.');
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
            src={competitionInfo.logo}
            alt={`${competitionInfo.name} logo`}
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
        className={`transition-max-height divide-y overflow-scroll duration-500 ease-in-out ${
          activeLeague ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {/* Mostrar solo el mensaje de carga mientras se está cargando */}
        {loading && <p className="p-5 text-center">Cargando partidos...</p>}

        {/* Mostrar los partidos o el mensaje de "No hay partidos" solo cuando no esté cargando */}
        {!loading && (
          <>
            {error ? (
              <p className="p-5 text-center">{error}</p>
            ) : (
              matches.map((match) => (
                <MatchCardCombined
                  key={match.id}
                  matchData={match}
                  handleSelectMatch={handleSelectMatch}
                />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
