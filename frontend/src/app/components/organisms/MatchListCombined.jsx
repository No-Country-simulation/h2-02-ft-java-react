import { useEffect, useState } from 'react';
import MatchDropdownCombined from '../molecules/MatchDropdownCombined';
import { getCompetitions } from '../../services/matchService';

export default function MatchListCombined({ handleSelectMatch }) {
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
    <div className="mb-14 flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitions.map((competition) => (
          <MatchDropdownCombined
            key={competition.id}
            competitionInfo={{
              code: competition.id,
              name: competition.name,
              logo: competition.logo,
            }}
            handleSelectMatch={handleSelectMatch}
          />
        ))}
      </div>
    </div>
  );
}
