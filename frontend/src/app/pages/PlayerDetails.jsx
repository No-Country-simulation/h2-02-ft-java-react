import { useParams } from 'react-router-dom';
import HeaderPlayer from '../components/molecules/HeaderPlayer';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TokenPlayer from '../components/organisms/TokenPlayer';
import DetailsPlayer from '../components/organisms/DetailsPlayer';
import { getPlayerProfileWithStatAndTrophies } from '../services/playerService';
import FooterNavbar from '../components/organisms/FooterNavbar';

export default function PlayerDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(
    location.state?.selectedView || 'detalles'
  );
  const [playerProfile, setPlayerProfile] = useState([]);

  useEffect(() => {
    const fetchPlayerProfile = async () => {
      const data = await getPlayerProfileWithStatAndTrophies(id);
      setPlayerProfile(data);
    };

    fetchPlayerProfile();
  }, [id]);

  console.log('info player: ', playerProfile);

  const renderContent = () => {
    switch (selectedView) {
      case 'detalles':
        return <DetailsPlayer playerData={playerProfile} />;
      case 'token':
        return <TokenPlayer playerData={playerProfile} />;
      default:
        return <DetailsPlayer playerData={playerProfile} />;
    }
  };

  return (
    <div className="flex justify-center">
      <main className="flex min-h-screen w-full flex-col overflow-hidden sm:max-w-[570px]">
        <HeaderPlayer
          currentView={selectedView}
          onViewChange={setSelectedView}
          photo={playerProfile.photo}
          name={playerProfile.name}
        />
        <div className="mb-[100px] flex-grow">{renderContent()}</div>
        <FooterNavbar />
      </main>
    </div>
  );
}
