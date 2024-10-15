import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import MatchCard from '../molecules/MatchCard';

export default function MatchDropdown({ leagues }) {
  const [activeLeague, setActiveLeague] = useState(null);

  const toggleLeague = (league) => {
    setActiveLeague(activeLeague === league ? null : league);
  };

  return (
    <div className="flex w-full flex-col px-5">
      {Object.keys(leagues).map((league, index) => (
        <div
          key={league}
          className={`shadow-custom mb-2 ${
            index === 0 ? 'rounded-t-lg' : ''
          } ${index === Object.keys(leagues).length - 1 ? 'rounded-b-lg' : ''}`}
        >
          <button
            onClick={() => toggleLeague(league)}
            className="flex h-14 w-full items-center justify-between rounded-[10px] bg-white px-5"
          >
            <div className="flex items-center">
              <div className="mr-2 flex h-12 w-12 items-center justify-center">
                <img
                  src={leagues[league].emblem}
                  alt={`${league} emblem`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex w-full">
                <span className="mr-2 whitespace-nowrap text-[16px] text-[#181818]">
                  {leagues[league].country}
                </span>
                <span
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[#555555]"
                  style={{ maxWidth: '170px' }}
                >
                  {league}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              {activeLeague === league ? (
                <IoIosArrowUp className="text-[#317EF4]" />
              ) : (
                <IoIosArrowDown className="text-[#317EF4]" />
              )}
            </div>
          </button>
          {activeLeague === league && (
            <div>
              {leagues[league].matches.map((match) => (
                <MatchCard key={match.id} matchData={match} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
