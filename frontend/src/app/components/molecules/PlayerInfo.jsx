import { IoCalendarClearOutline } from 'react-icons/io5';
import { TbSoccerField } from 'react-icons/tb';
import iso3166 from 'iso-3166-1';

export default function PlayerInfo({ playerInfo }) {
  const countryCode = playerInfo.nationality
    ? iso3166.whereCountry(playerInfo.nationality)?.alpha2.toLowerCase()
    : '';

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-regularNav-16 font-medium text-label">
        Datos del jugador
      </h2>
      <ul className="flex flex-col divide-y overflow-hidden rounded-large shadow-custom">
        <li className="grid h-14 grid-cols-[24px_1fr] items-center gap-4 px-4 py-2 text-sm leading-[16.8px]">
          {countryCode && (
            <img src={`https://flagcdn.com/${countryCode}.svg`} alt="Flag" />
          )}
          <div className="flex flex-col">
            <p className="text-grayLightWaki">Nacionalidad</p>
            <p className="text-label">{playerInfo.nationality || 'N/A'}</p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[24px_1fr] items-center gap-4 px-4 py-2 text-sm leading-[16.8px]">
          <IoCalendarClearOutline className="text-purpleWaki" size={24} />
          <div className="flex flex-col">
            <p className="text-grayLightWaki">Edad</p>
            <p className="text-label">{playerInfo.age}</p>
          </div>
        </li>
        <li className="grid h-14 grid-cols-[24px_1fr] items-center gap-4 px-4 py-2 text-sm leading-[16.8px]">
          <TbSoccerField className="text-purpleWaki" size={24} />
          <div className="flex flex-col">
            <p className="text-grayLightWaki">Posición</p>
            <p className="text-label">{playerInfo.position}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
