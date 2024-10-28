import DivisionBronce from '../../../assets/bronce.png';
import DivisionPlata from '../../../assets/plata.png';
import DivisionOro from '../../../assets/oro.png';
import PointsProgress from '../molecules/PointsProgress';
import MonthlyRewards from '../molecules/MonthlyRewards';

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
      <MonthlyRewards divisions={divisions} divisionTitles={divisionTitles} />
    </main>
  );
}
