import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';

export default function MatchDropdown({ leagues, competitionInfo }) {
  const [activeLeague, setActiveLeague] = useState(null);
  // console.log('leagues', leagues);

  const toggleLeague = () => {
    setActiveLeague(activeLeague ? null : competitionInfo.name);
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
      {activeLeague && (
        <div>
          {leagues.matches.map((match) => (
            <MatchCard key={match.id} matchData={match} />
          ))}
        </div>
      )}
    </>
  );
}
