import { useEffect, useState } from 'react';
import MatchDropdown from '../molecules/MatchDropdown';
import { getAreaCompetitions } from '../../services/matchService';

export default function MatchList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const areaCompetitions = await getAreaCompetitions();
        setCompetitions(areaCompetitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitions.map((competition) => (
          <MatchDropdown
            key={competition.competitionCode}
            competitionInfo={{
              code: competition.competitionCode,
              name: competition.competitionName,
              emblem: competition.competitionEmblem,
            }}
          />
        ))}
      </div>
    </div>
  );
}
