export default function Quests({ divisionData }) {
  const { division, points } = divisionData;
  const necessaryPoints = 300;

  const progressPercentage = (points / necessaryPoints) * 100;

  const nextDivisionTitles = {
    BRONZE: 'Plata',
    SILVER: 'Oro',
    GOLD: '',
  };

  const nextDivisionTitle = nextDivisionTitles[division];

  return (
    <div className="flex w-full flex-col overflow-hidden">
      {division === 'LIMBO' ? (
        <div className="flex w-full flex-col items-center justify-center p-4">
          <p className="text-center text-medium-18 text-label">
            Debes ganar puntos para clasificarte.
          </p>
        </div>
      ) : (
        <div className="m-5 flex h-[198.22px] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blueWaki to-purpleWaki p-5 text-white">
          <div className="flex items-center pb-5 text-medium-18">
            Tus puntos
          </div>
          <div className="text-[48px]">{points}</div>
          <div className="self-start pt-5 text-regularNav-16">
            {points} de {necessaryPoints} puntos
          </div>
          <div className="relative mt-2 h-[44.74px] w-full overflow-hidden rounded-full bg-[#D4D4D4]">
            <div
              className={`absolute left-0 top-0 h-full rounded-full ${progressPercentage === 0 ? 'bg-[#D4D4D4]' : 'bg-white'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {nextDivisionTitle && (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start pl-4 text-regularNav-16 text-label">
                {nextDivisionTitle}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
