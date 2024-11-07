import LeagueEmblem from '../../../assets/leagueEmblem.png';

export default function HeaderLeague({
  league,
  competitionShield,
  isCombined = false,
}) {
  return (
    <div className="flex h-9 items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        {/* Liga y logo */}
        <img
          src={competitionShield || LeagueEmblem}
          alt="Logo"
          width={'18px'}
        />
        <p className="text-regular-12 text-grayWaki">{league}</p>
      </div>
      {isCombined && (
        <img src={LeagueEmblem} alt="logo is Combined" width={18} />
      )}
    </div>
  );
}
