import { useLocation } from 'react-router-dom';
import DivisionOro from '../../assets/oro.png';
import DivisionPlata from '../../assets/plata.png';
import PageNavbar from '../components/molecules/PageNavbar';
import FooterNavbar from '../components/organisms/FooterNavbar';
import RewardsDivisions from '../components/organisms/RewardsDivisions';
import RewardsMonthly from '../components/organisms/RewardsMonthly';
import RankingList from '../components/organisms/RankingList';
import { usePlayers } from '../context/PlayerContext';

export default function RewardsDivision() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const division = queryParams.get('division');

  const isGold = division === 'GOLD';
  const divisionImage = isGold ? DivisionOro : DivisionPlata;
  const divisionTitle = isGold ? 'División Oro' : 'División Plata';

  const { getGoldDivisionPlayers, getSilverDivisionPlayers } = usePlayers();
  const rankingList = isGold
    ? getGoldDivisionPlayers()
    : getSilverDivisionPlayers();

  return (
    <main className="relative mt-[80px] flex w-full flex-col overflow-hidden sm:max-w-[570px]">
      <PageNavbar beforePage={'Divisiones'} />
      <div className="py-7 text-center text-[22px] font-semibold text-blueWaki">
        <div className="flex flex-col items-center gap-5">
          <span>{divisionTitle}</span>
          <img
            src={divisionImage}
            alt={divisionTitle}
            className="h-[111.31px] object-contain"
          />
        </div>
      </div>
      <div className="w-full rounded-t-lg bg-[#F7F7F7] shadow-custom">
        <div className="m-7 text-medium-18 font-semibold text-label">
          Recompensas
        </div>
        <RewardsDivisions isGold={isGold} />
        <div className="m-7 text-medium-18 font-semibold text-label">
          Premios del mes
        </div>
        <RewardsMonthly isGold={isGold} />
        <div className="m-7 text-medium-18 font-semibold text-label">
          Tokens {divisionTitle}
        </div>
        <div className="mb-[100px]">
          <RankingList rankingList={rankingList} />
        </div>
      </div>
      <div className="relative z-20">
        <FooterNavbar />
      </div>
    </main>
  );
}
