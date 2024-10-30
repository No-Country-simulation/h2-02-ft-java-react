import { useEffect, useState } from 'react';
import MatchDropdown from '../molecules/MatchDropdown';
import { getCompetitions } from '../../services/matchService';

export default function MatchList({ handleSelectMatch, isCombined = false }) {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const areaCompetitions = await getCompetitions();
        setCompetitions(areaCompetitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className={`flex w-full flex-col p-5 ${isCombined && 'mb-14'}`}>
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitions.map((competition) => {
          const competitionInfo = {
            code: competition.id,
            name: competition.name,
            logo: competition.logo,
          };

          return (
            <MatchDropdown
              key={competition.id}
              competitionInfo={competitionInfo}
              handleSelectMatch={handleSelectMatch}
              isCombined={isCombined}
            />
          );
        })}
      </div>
    </div>
  );
}
