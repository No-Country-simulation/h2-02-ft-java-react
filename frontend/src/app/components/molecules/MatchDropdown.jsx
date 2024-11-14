import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';
import { getMatchesLeagueDate } from '../../services/matchService';
import { useDate } from '../../context/DateContext';
import { formatDate } from '../../utils/dateUtils';

export default function MatchDropdown({ competitionInfo, isCombined }) {
  const [matches, setMatches] = useState([]);
  const [activeLeague, setActiveLeague] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedDate } = useDate();
  const today = new Date();

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMatches = await getMatchesLeagueDate(
        competitionInfo.code,
        formatDate(selectedDate === null ? today : selectedDate)
      );

      setMatches(
        fetchedMatches.map((match) => ({
          id: match.fixture.id,
          referee: match.fixture.referee,
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
              ? `${match.fixture.goals.homeGoals} - ${match.fixture.goals.awayGoals}`
              : match.fixture.status.shortStatus === 'NS'
                ? 'vs'
                : `${match.fixture.goals.homeGoals || 0} - ${match.fixture.goals.awayGoals || 0}`,
          odds: {
            localWin: match.odds[0]?.bookmaker?.bet?.values.homeOdd || 'N/A',
            draw: match.odds[0]?.bookmaker?.bet?.values.drawOdd || 'N/A',
            visitorWin: match.odds[0]?.bookmaker?.bet?.values.awayOdd || 'N/A',
          },
          startTime: match.fixture.date,
          stadium: match.fixture.venue.venueName,
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

  useEffect(() => {
    if (activeLeague) {
      fetchMatches();
    }
  }, [selectedDate, activeLeague]);

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
          <IoIosArrowDown
            className={`text-blueWaki transition-transform duration-300 ${
              activeLeague ? 'rotate-180' : 'rotate-0'
            }`}
            size={18}
          />
        </div>
      </button>

      <div
        className={`transition-max-height divide-y overflow-y-scroll duration-500 ease-in-out ${
          activeLeague ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {loading && <p className="p-5 text-center">Cargando partidos...</p>}
        {!loading && (
          <>
            {error ? (
              <p className="p-5 text-center">{error}</p>
            ) : (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  matchData={match}
                  isCombined={isCombined}
                />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
