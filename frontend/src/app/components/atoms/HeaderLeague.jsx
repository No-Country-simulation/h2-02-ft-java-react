import LeagueEmblem from '../../../assets/leagueEmblem.png';
import CombinedIcon from '../../../assets/combined.svg';
import SimpleIcon from '../../../assets/simple.svg';

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
      {isCombined ? (
        <img
          src={CombinedIcon}
          alt="logo prediction Combined"
          className="h-[18px]"
        />
      ) : (
        <img src={SimpleIcon} alt="logo prediction Simple" width={18} />
      )}
    </div>
  );
}
