import { useLocation } from 'react-router-dom';
import { usePlayers } from '../context/PlayerContext';
import RankingList from '../components/organisms/RankingList';
import HeaderScoutPlayer from '../components/molecules/HeaderScoutPlayer';
import FooterNavbar from '../components/organisms/FooterNavbar';
import Market from '../components/organisms/Market';
import StatsToken from '../components/organisms/StatsToken';
import { useState } from 'react';
import Searchbar from '../components/molecules/Searchbar';
import { LuArrowDownUp } from 'react-icons/lu';

export default function ScoutPlayers() {
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(
    location.state?.selectedView || 'ranking-scout'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(false);
  const { getAllPlayers } = usePlayers();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  };

  const filteredPlayers = getAllPlayers()
    .filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));

  const renderContent = () => {
    switch (selectedView) {
      case 'ranking-scout':
        return (
          <>
            <h2 className="px-5 pt-5 text-[18px] text-[#181818]">
              Ranking de jugadores
            </h2>
            <Searchbar
              placeholder="Buscar jugador"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="flex gap-5 px-5 pb-5">
              <LuArrowDownUp
                size={24}
                className="cursor-pointer text-purpleWaki"
                onClick={handleSortToggle}
              />
              <p className="text-black">
                Ordenar por: <span className="text-grayWaki">Precio</span>
              </p>
            </div>
            <RankingList rankingList={filteredPlayers} />
          </>
        );
      case 'market':
        return <Market />;
      case 'estadisticas-token':
        return <StatsToken />;
      default:
        return <RankingList rankingList={filteredPlayers} />;
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden sm:min-w-[570px]">
      <HeaderScoutPlayer
        currentView={selectedView}
        onViewChange={setSelectedView}
      />
      <div className="mb-[100px] mt-[145px] flex-grow">{renderContent()}</div>
      <FooterNavbar />
    </main>
  );
}
