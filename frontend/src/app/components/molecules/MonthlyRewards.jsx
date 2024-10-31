import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function MonthlyRewards({ divisions, divisionTitles }) {
  return (
    <div className="mt-4 h-[441.17px] w-full rounded-lg p-3 shadow-custom">
      <div className="text-[22px] font-semibold text-blueWaki">
        ¡Premios todos los meses!
      </div>
      {['GOLD', 'SILVER', 'BRONZE'].map((div) => (
        <div
          key={div}
          className="mt-4 flex h-[112.14px] items-center rounded-lg bg-[#F3F4F5] p-4"
        >
          <img
            src={divisions[div]}
            alt={`Division ${div}`}
            className="mr-4 h-[65px]"
          />
          <div className="flex-grow">
            <div className="text-[16px] text-[#181818]">
              {divisionTitles[div]}
            </div>
            <div className="text-[14px] text-[#555555]">
              {div === 'BRONZE'
                ? 'Esta división no ofrece recompensas. Sube a la división plata para participar por premios.'
                : 'Descubre las recompensas de esta división.'}
            </div>
          </div>
          {div !== 'BRONZE' && (
            <Link to={`/rewardsDivision?division=${div}`}>
              <MdKeyboardArrowRight className="text-blueWaki" size={24} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
