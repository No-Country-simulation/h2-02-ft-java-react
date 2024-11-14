import { LuSparkle } from 'react-icons/lu';

export default function PointsProgress({
  myPoints,
  necessaryPoints,
  currentDivision,
}) {
  const progressPercentage = (myPoints / necessaryPoints) * 100;

  const nextDivisionTitles = {
    bronce: 'Plata',
    plata: 'Oro',
    oro: '',
  };

  const nextDivisionTitle = nextDivisionTitles[currentDivision];

  return (
    <div className="w-full">
      <div className="mt-4 flex h-[65.82px] w-full items-center justify-between rounded-t-lg bg-blueWaki px-4">
        <div className="flex items-center text-medium-18 text-white">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
            <LuSparkle className="fill-current text-white" />
          </div>
          Tus puntos
        </div>
        <div className="text-[26px] font-semibold text-white">{myPoints}</div>
      </div>
      <div className="flex h-[135px] w-full flex-col justify-center rounded-b-lg bg-white p-6 shadow-custom">
        <div className="flex items-center justify-between pb-3 text-regular-14 text-label">
          <span>Desbloquear división</span>
          <span>
            {myPoints} de {necessaryPoints} puntos
          </span>
        </div>
        <div className="relative h-[44.74px] w-full overflow-hidden rounded-full border-2 border-purpleWaki">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blueWaki to-purpleWaki"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          {nextDivisionTitle && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start pl-4 text-regularNav-16 text-white">
              {nextDivisionTitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
