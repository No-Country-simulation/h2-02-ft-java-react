import { GiWhistle } from 'react-icons/gi';
import { TbSoccerField } from 'react-icons/tb';
import { BiTrophy } from 'react-icons/bi';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { IoCalendarClearOutline } from 'react-icons/io5';

export default function DetailsMatch() {
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
              24 de septiembre 10:00hs
            </p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <MdOutlineFormatListNumbered className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Torneo</p>
            <p className="max-w-64 truncate text-grayWaki">La Liga</p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <BiTrophy className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Copa</p>
            <p className="max-w-64 truncate text-grayWaki">UEFA</p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <TbSoccerField className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Estadio</p>
            <p className="max-w-64 truncate text-grayWaki">Nombre estadio</p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[18px_1fr] items-center gap-4 px-4 py-2 leading-[16.8px]">
          <GiWhistle className="text-purpleWaki" size={18} />
          <div className="flex flex-col">
            <p className="text-label">Árbitro</p>
            <p className="max-w-64 truncate text-grayWaki">Nombre árbitro</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
