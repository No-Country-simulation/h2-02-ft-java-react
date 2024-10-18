import MatchDropdown from '../molecules/MatchDropdown';
import competitionsData from '../../data/competitions.json';

export default function MatchList({ selectedDate }) {
  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        {competitionsData.competitions.map((competition) => (
          <MatchDropdown
            key={competition.code}
            competitionInfo={{
              code: competition.code,
              name: competition.name,
              emblem: competition.logoUrl,
            }}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
}
