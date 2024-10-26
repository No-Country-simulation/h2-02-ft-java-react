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
  console.log(competitions);

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitions.map((competition) => (
          <MatchDropdown
            key={competition.id}
            competitionInfo={{
              code: competition.id,
              name: competition.name,
              logo: competition.logo,
            }}
          />
        ))}
      </div>
    </div>
  );
}
