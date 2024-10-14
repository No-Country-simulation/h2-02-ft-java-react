import { MdOutlineSignalCellularAlt } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function MatchCard({ matchData }) {
  const { localTeam, visitorTeam, score, predictions, startTime } = matchData;
  const [elapsedTime, setElapsedTime] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startTime);
      const now = new Date();
      const diff = Math.floor((now - start) / 1000);

      if (now >= start) {
        setHasStarted(true);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        if (minutes >= 90) {
          setElapsedTime('FT');
          clearInterval(interval);
        } else {
          setElapsedTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }
      } else {
        setHasStarted(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="relative flex h-36 flex-col bg-[#F3F4F5] py-5">
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 overflow-hidden">
            <img
              src={localTeam.logoUrl}
              alt={`${localTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-xs text-[#555555]">{localTeam.name}</p>
        </div>
        <div className="flex flex-col items-center">
          {hasStarted && (
            <>
              <MdOutlineSignalCellularAlt className="h-4.5 w-5 font-semibold text-[#8E2BFF]" />
              <p className="text-lg font-semibold text-[#181818]">{score}</p>
              <p className="flex items-center text-[10.35px]">
                <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                {elapsedTime}
              </p>
            </>
          )}
          {!hasStarted && (
            <p className="text-lg font-semibold text-[#181818]">vs</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 overflow-hidden">
            <img
              src={visitorTeam.logoUrl}
              alt={`${visitorTeam.name} Logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-xs text-[#555555]">{visitorTeam.name}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-row items-center justify-around">
        <p
          className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.27px] border border-black border-opacity-5 bg-white text-xs"
          style={{ borderWidth: '0.52px' }}
        >
          {predictions.localWin}
        </p>
        <p
          className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.27px] border border-black border-opacity-5 bg-white text-xs"
          style={{ borderWidth: '0.52px' }}
        >
          {predictions.draw}
        </p>
        <p
          className="flex h-[27px] w-[83px] items-center justify-center rounded-[6.27px] border border-black border-opacity-5 bg-white text-xs"
          style={{ borderWidth: '0.52px' }}
        >
          {predictions.visitorWin}
        </p>
      </div>
    </div>
  );
}
