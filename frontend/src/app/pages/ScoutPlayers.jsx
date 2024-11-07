import { useLocation } from 'react-router-dom';
import { usePlayers } from '../context/PlayerContext';
import RankingList from '../components/organisms/RankingList';
import HeaderScoutPlayer from '../components/molecules/HeaderScoutPlayer';
import FooterNavbar from '../components/organisms/FooterNavbar';
import Market from '../components/organisms/Market';
import { useState } from 'react';
import Searchbar from '../components/molecules/Searchbar';

export default function ScoutPlayers() {
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(
    location.state?.selectedView || 'ranking-scout'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const { getAllPlayers } = usePlayers();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlayers = getAllPlayers().filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <RankingList rankingList={filteredPlayers} />
          </>
        );
      case 'market':
        return <Market />;
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
