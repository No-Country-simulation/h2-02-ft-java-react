import { GiWhistle } from 'react-icons/gi';
import { TbSoccerField } from 'react-icons/tb';
import { BiTrophy } from 'react-icons/bi';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { useMatch } from '../../context/MatchContext';
import { formatDateWithTime } from '../../utils/dateUtils';

export default function DetailsMatch() {
  const { selectedMatch } = useMatch();
  const formattedStartTime = formatDateWithTime(selectedMatch.startTime);
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-regularNav-16 font-medium text-label">
        Detalles del partido
      </h2>
      <ul className="flex flex-col divide-y overflow-hidden rounded-large shadow-custom">
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <IoCalendarClearOutline className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Fecha y hora</p>
            <p className="max-w-64 truncate text-grayWaki">
              {formattedStartTime}
            </p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <BiTrophy className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Competencia</p>
            <p className="max-w-64 truncate text-grayWaki">
              {selectedMatch.league.name || 'N/A'}
            </p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <TbSoccerField className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Estadio</p>
            <p className="max-w-64 truncate text-grayWaki">
              {selectedMatch.stadium === 'null' || selectedMatch.stadium == null
                ? 'N/A'
                : selectedMatch.stadium}
            </p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <GiWhistle className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Árbitro</p>
            <p className="max-w-64 truncate text-grayWaki">
              {selectedMatch.referee === 'null' || selectedMatch.referee == null
                ? 'N/A'
                : selectedMatch.referee}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
