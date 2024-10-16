import { useEffect, useState } from 'react';
import { getMatches } from '../../services/matchService';
import MatchDropdown from '../molecules/MatchDropdown';

export default function MatchList({ selectedDate }) {
  const [leagues, setLeagues] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matches = await getMatches();
        console.log('matches', matches);
        const groupedMatches = matches.reduce((acc, match) => {
          const league = match.competition.name;
          if (!acc[league]) {
            acc[league] = {
              matches: [],
              country: match.area.name,
              emblem: match.competition.emblem,
            };
          }
          acc[league].matches.push({
            id: match.id,
            localTeam: {
              name: match.homeTeam.name,
              logoUrl: match.homeTeam.crest,
            },
            visitorTeam: {
              name: match.awayTeam.name,
              logoUrl: match.awayTeam.crest,
            },
            score: `${match.score.fullTime.home || 0}-${match.score.fullTime.away || 0}`,
            predictions: {
              localWin: match.match_odds.home_team,
              draw: match.match_odds.draw,
              visitorWin: match.match_odds.away_team,
            },
            startTime: match.utcDate,
          });
          return acc;
        }, {});
        setLeagues(groupedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const filteredLeagues = Object.keys(leagues).reduce((acc, league) => {
    const filteredMatches = leagues[league].matches.filter((match) => {
      const matchDate = new Date(match.startTime).toLocaleDateString('es-ES');
      return matchDate === selectedDate;
    });
    if (filteredMatches.length > 0) {
      acc[league] = { ...leagues[league], matches: filteredMatches };
    }
    return acc;
  }, {});

  return <MatchDropdown leagues={filteredLeagues} />;
}
