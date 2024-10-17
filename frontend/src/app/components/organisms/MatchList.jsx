import { useEffect, useState } from 'react';
import MatchDropdown from '../molecules/MatchDropdown';
import competitionsData from '../../data/competitions.json'; // Importa el archivo competitions.json
import matchesData from '../../data/matches.json'; // Importa el archivo de partidos

export default function MatchList({ selectedDate }) {
  const [leagues, setLeagues] = useState({});

  useEffect(() => {
    // Simula la agrupación de los partidos usando los datos del JSON de partidos
    const groupedMatches = matchesData.matches.reduce((acc, match) => {
      const leagueCode = match.competitionCode;

      if (!acc[leagueCode]) {
        acc[leagueCode] = {
          matches: [],
        };
      }
      acc[leagueCode].matches.push({
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
      });
      return acc;
    }, {});

    setLeagues(groupedMatches);
  }, []);

  // Filtrar partidos por fecha seleccionada
  const filteredLeagues = Object.keys(leagues).reduce((acc, leagueCode) => {
    const filteredMatches = leagues[leagueCode].matches.filter((match) => {
      const matchDate = new Date(match.startTime).toLocaleDateString('es-ES');
      return matchDate === selectedDate;
    });
    acc[leagueCode] = { ...leagues[leagueCode], matches: filteredMatches };
    return acc;
  }, {});

  // Renderizamos un MatchDropdown para cada competencia, incluso si no hay partidos
  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitionsData.competitions.map((competition) => {
          const leagueCode = competition.code;
          const leagueMatches = filteredLeagues[leagueCode] || { matches: [] };

          return (
            <MatchDropdown
              key={leagueCode}
              leagues={leagueMatches} // Los partidos filtrados para la competencia (vacío si no hay)
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
