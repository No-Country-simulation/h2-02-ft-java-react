import { useEffect, useState } from 'react';
import MatchDropdown from '../molecules/MatchDropdown';
import { getCompetitions } from '../../services/matchService';
import { useDate } from '../../context/DateContext';

export default function MatchList({ handleSelectMatch, isCombined = false }) {
  const { updateSelectedDate } = useDate();
  const [competitions, setCompetitions] = useState([]);
  const today = new Date();
  useEffect(() => {
    updateSelectedDate(today);
  }, []);

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
