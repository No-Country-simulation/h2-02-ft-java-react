import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import PointsProgress from '../molecules/PointsProgress';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function Rewards({ divisionData }) {
  const { division, points } = divisionData;

  const divisions = {
    bronce: DivisionBronce,
    plata: DivisionPlata,
    oro: DivisionOro,
  };

  const divisionTitles = {
    bronce: 'División Bronce',
    plata: 'División Plata',
    oro: 'División Oro',
  };

  const necessaryPoints = 300;

  return (
    <main className="flex w-full flex-col items-center overflow-hidden p-4 sm:min-w-[570px]">
      <img
        src={divisions[division]}
        alt={`Division ${division}`}
        className="mb-4 h-[105.33px]"
      />
      <div className="text-center text-[18px] text-[#555555]">Estás en la</div>
      <div className="pb-7 text-center text-[22px] font-semibold text-blueWaki">
        {divisionTitles[division]}
      </div>
      <PointsProgress
        myPoints={points}
        necessaryPoints={necessaryPoints}
        currentDivision={division}
      />
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
    </main>
  );
}
