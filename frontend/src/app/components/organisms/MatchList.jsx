import { useEffect, useState } from 'react';
import MatchDropdown from '../molecules/MatchDropdown';
import competitionsData from '../../data/competitions.json';
import { getMatches } from '../../services/matchService';

export default function MatchList({ selectedDate }) {
  const [leagues, setLeagues] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const groupedMatches = {};

        // Itera sobre cada competencia y llama al servicio para obtener los partidos
        for (const competition of competitionsData.competitions) {
          const competitionCode = competition.code;

          // Llamada a la API para obtener los partidos de la competencia actual
          const matches = await getMatches(competitionCode);
          console.log('matches', matches);

          // Agrupa los partidos por competencia
          groupedMatches[competitionCode] = {
            matches: matches.map((match) => ({
              id: match.id,
              localTeam: {
                name: match.homeTeam.name,
                logoUrl: match.homeTeam.logoUrl,
              },
              visitorTeam: {
                name: match.awayTeam.name,
                logoUrl: match.awayTeam.logoUrl,
              },
              score: match.status === 'FINISHED' ? match.score : null,
              predictions: {
                localWin: match.homeTeam.winPercentage,
                draw: null, // Puedes agregar lógica para el porcentaje de empate si es necesario
                visitorWin: match.awayTeam.winPercentage,
              },
              startTime: match.date,
            })),
          };
        }

        setLeagues(groupedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  // Función para filtrar partidos por código de liga
  const filterMatchesByLeague = (leagueCode) => {
    if (!leagues[leagueCode]) return { matches: [] }; // Si no hay partidos para la liga, devolver un array vacío
    const filteredMatches = leagues[leagueCode].matches.filter((match) => {
      const matchDate = new Date(match.utcDate).toLocaleDateString('es-ES');
      console.log('matchDate', matchDate);

      return matchDate === selectedDate; // Filtrar por fecha seleccionada
    });
    console.log('filteredMatches', filteredMatches);

    return { matches: filteredMatches };
  };

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitionsData.competitions.map((competition) => {
          const leagueCode = competition.code;

          // Usamos la función filterMatchesByLeague para obtener los partidos filtrados
          const leagueMatches = filterMatchesByLeague(leagueCode);

          return (
            <MatchDropdown
              key={leagueCode}
              leagues={leagueMatches}
              competitionInfo={{
                name: competition.name,
                emblem: competition.logoUrl,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
