import { IoCalendarClearOutline } from 'react-icons/io5';
import { TbSoccerField } from 'react-icons/tb';
import iso3166 from 'iso-3166-1';

export default function PlayerInfo({ playerInfo }) {
  const countryCode = playerInfo.nationality
    ? iso3166.whereCountry(playerInfo.nationality)?.alpha2.toLowerCase()
    : '';

  return (
    <div className="rounded-lg p-5 shadow-custom">
      <div className="mb-4 flex items-center gap-3">
        {countryCode && (
          <img
            src={`https://flagcdn.com/${countryCode}.svg`}
            alt="Flag"
            className="mr-2 h-6 w-6"
          />
        )}
        <div>
          <div className="text-[14px] text-[#8D8D8D]">Nacionalidad</div>
          <div className="text-[14px] text-[#181818]">
            {playerInfo.nationality || 'N/A'}
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="mb-4 mt-4 flex items-center gap-3">
        <IoCalendarClearOutline className="mr-2 h-6 w-6 text-purpleWaki" />
        <div>
          <div className="text-[14px] text-[#8D8D8D]">Edad</div>
          <div className="text-[14px] text-[#181818]">{playerInfo.age}</div>
        </div>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="mt-4 flex items-center gap-3">
        <TbSoccerField className="mr-2 h-6 w-6 text-purpleWaki" />
        <div>
          <div className="text-[14px] text-[#8D8D8D]">Posición</div>
          <div className="text-[14px] text-[#181818]">
            {playerInfo.position}
          </div>
        </div>
      </div>
    </div>
  );
}
