import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFootballOutline } from 'react-icons/io5';
import { GiCornerFlag } from 'react-icons/gi';
import { TbCards } from 'react-icons/tb';

export default function KeysMoments() {
  const [activeLeague, setActiveLeague] = useState(false);

  const toggleLeague = () => {
    setActiveLeague(!activeLeague);
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-regularNav-16 font-medium text-label">
        Momentos clave
      </h2>
      <div className="w-full divide-y overflow-hidden rounded-large shadow-custom">
        <button
          onClick={toggleLeague}
          className="flex h-14 w-full items-center justify-between bg-white px-4"
        >
          <div className="grid grid-cols-[18px_1fr] items-center gap-4 py-2 leading-[16.8px]">
            <IoFootballOutline className="text-purpleWaki" size={18} />
            <p className="text-label">Goles</p>
          </div>
          <div className="flex-shrink-0 transform transition-transform duration-300">
            <IoIosArrowDown
              className={`text-blueWaki transition-transform duration-300 ${
                activeLeague ? 'rotate-180' : 'rotate-0'
              }`}
              size={18}
            />
          </div>
        </button>
        <button
          onClick={toggleLeague}
          className="flex h-14 w-full items-center justify-between bg-white px-4"
        >
          <div className="grid grid-cols-[18px_1fr] items-center gap-4 py-2 leading-[16.8px]">
            <GiCornerFlag className="text-purpleWaki" size={18} />
            <p className="text-label">Tiros de esquina</p>
          </div>
          <div className="flex-shrink-0 transform transition-transform duration-300">
            <IoIosArrowDown
              className={`text-blueWaki transition-transform duration-300 ${
                activeLeague ? 'rotate-180' : 'rotate-0'
              }`}
              size={18}
            />
          </div>
        </button>
        <button
          onClick={toggleLeague}
          className="flex h-14 w-full items-center justify-between bg-white px-4"
        >
          <div className="grid grid-cols-[18px_1fr] items-center gap-4 py-2 leading-[16.8px]">
            <TbCards className="text-purpleWaki" size={18} />
            <p className="text-label">Tarjetas</p>
          </div>
          <div className="flex-shrink-0 transform transition-transform duration-300">
            <IoIosArrowDown
              className={`text-blueWaki transition-transform duration-300 ${
                activeLeague ? 'rotate-180' : 'rotate-0'
              }`}
              size={18}
            />
          </div>
        </button>

        {/* <div
        className={`transition-max-height divide-y overflow-y-scroll duration-500 ease-in-out ${
          activeLeague ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {loading && <p className="p-5 text-center">Cargando partidos...</p>}
        {!loading && (
          <>
            {error ? (
              <p className="p-5 text-center">{error}</p>
            ) : (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  matchData={match}
                  isCombined={isCombined}
                />
              ))
            )}
          </>
        )}
      </div> */}
      </div>
    </div>
  );
}
