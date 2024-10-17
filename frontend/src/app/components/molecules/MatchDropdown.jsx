import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';

export default function MatchDropdown({ leagues, competitionInfo }) {
  const [activeLeague, setActiveLeague] = useState(null);

  const toggleLeague = () => {
    setActiveLeague(activeLeague ? null : competitionInfo.name);
  };

  return (
    <>
      <button
        onClick={toggleLeague}
        className="flex h-14 w-full items-center justify-between bg-white px-5"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src={competitionInfo.emblem}
              alt={`${competitionInfo.name} emblem`}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex w-full gap-2">
            <span className="whitespace-nowrap text-regularNav-16 text-label">
              {competitionInfo.name}
            </span>
          </div>
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
