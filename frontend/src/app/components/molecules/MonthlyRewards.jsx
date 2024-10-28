import { MdKeyboardArrowRight } from 'react-icons/md';

export default function MonthlyRewards({ divisions, divisionTitles }) {
  return (
    <div className="mt-4 h-[441.17px] w-full rounded-lg p-3 shadow-custom">
      <div className="text-[22px] font-semibold text-blueWaki">
        ¡Premios todos los meses!
      </div>
      {['oro', 'plata', 'bronce'].map((div) => (
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
              {div === 'bronce'
                ? 'Esta división no ofrece recompensas. Sube a la división plata para participar por premios.'
                : 'Descubre las recompensas de esta división.'}
            </div>
          </div>
          {div !== 'bronce' && (
            <MdKeyboardArrowRight className="text-blueWaki" size={24} />
          )}
        </div>
      ))}
    </div>
  );
}
