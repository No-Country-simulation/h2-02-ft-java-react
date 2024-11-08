import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDivision from '../components/molecules/HeaderDivision';
import FooterNavbar from '../components/organisms/FooterNavbar';
import Ranking from '../components/organisms/Ranking';
import Rewards from '../components/organisms/Rewards';
import Quests from '../components/organisms/Quests';
import { useAuth } from '../context/AuthContext';
import { getUserRanking } from '../services/divisionService';

export default function Divisions() {
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(
    location.state?.selectedView || 'ranking'
  );
  const [divisionData, setDivisionData] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const data = await getUserRanking(userId);
        setDivisionData(data);
      } catch (error) {
        console.error('Error al obtener el ranking del usuario:', error);
      }
    };

    if (userId) {
      fetchUserRanking();
    }
  }, [userId]);

  const renderContent = () => {
    switch (selectedView) {
      case 'ranking':
        return <Ranking divisionData={divisionData} />;
      case 'rewards':
        return <Rewards divisionData={divisionData} />;
      case 'quests':
        return <Quests divisionData={divisionData} />;
      default:
        return <Ranking divisionData={divisionData} />;
    }
  };

  return (
    <div className="flex justify-center">
      <main className="relative flex min-h-screen w-full flex-col sm:max-w-[570px] sm:overflow-hidden">
        <HeaderDivision
          currentView={selectedView}
          onViewChange={setSelectedView}
        />
        <div className="mb-[90px] mt-[145px] flex-grow">{renderContent()}</div>
        <FooterNavbar />
      </main>
    </div>
  );
}
