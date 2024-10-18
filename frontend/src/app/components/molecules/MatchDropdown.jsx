import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';
import { getMatchesToday } from '../../services/matchService';

export default function MatchDropdown({ competitionInfo, selectedDate }) {
  const [matches, setMatches] = useState([]);
  const [activeLeague, setActiveLeague] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log('matches', matches);
  console.log('competitionInfo', competitionInfo);
  console.log('selectedDate', selectedDate);

  const toggleLeague = async () => {
    if (!activeLeague) {
      setLoading(true);
      setError(null);

      try {
        // Llamada a la API para obtener los partidos de la competencia y fecha seleccionada
        const fetchedMatches = await getMatchesToday(
          competitionInfo.code,
          selectedDate
        );

        // Almacenar los partidos en el estado
        setMatches(
          fetchedMatches.map((match) => ({
            id: match.id,
            localTeam: {
              name: match.homeTeam.name,
              logoUrl: match.homeTeam.crest, // El logo del equipo local
            },
            visitorTeam: {
              name: match.awayTeam.name,
              logoUrl: match.awayTeam.crest, // El logo del equipo visitante
            },
            score:
              match.status === 'FINISHED'
                ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                : null, // Si el partido ha finalizado muestra el score
            predictions: {
              localWin: match.match_odds.home_team, // Porcentaje de apuesta para el equipo local
              draw: match.match_odds.draw, // Porcentaje de empate
              visitorWin: match.match_odds.away_team, // Porcentaje de apuesta para el equipo visitante
            },
            startTime: match.utcDate, // Fecha y hora del partido
            status: match.status, // Estado del partido (ej. 'TIMED', 'FINISHED')
          }))
        );
      } catch (error) {
        setError('Error fetching matches');
      } finally {
        setLoading(false);
      }
    }
    setActiveLeague(!activeLeague); // Alterna entre mostrar/ocultar la liga
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
        <div className="flex-shrink-0">
          {activeLeague ? (
            <IoIosArrowUp className="text-blueWaki" size={18} />
          ) : (
            <IoIosArrowDown className="text-blueWaki" size={18} />
          )}
        </div>
      </button>

      {/* Mostrar los partidos si la liga está activa */}
      {activeLeague && (
        <div>
          {loading && <p>Cargando partidos...</p>}
          {error && (
            <p className="px-5 pt-2 text-center text-red-500">{error}</p>
          )}
          {matches.length === 0 && !loading && (
            <p className="px-5 pb-2 text-center">
              No hay partidos disponibles.
            </p>
          )}
          {matches.map((match) => (
            <MatchCard key={match.id} matchData={match} />
          ))}
        </div>
      )}
    </>
  );
}
