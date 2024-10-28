import { useState } from 'react';
import HeaderDivision from '../components/molecules/HeaderDivision';
import FooterNavbar from '../components/organisms/FooterNavbar';
import Ranking from '../components/organisms/Ranking';
import Rewards from '../components/organisms/Rewards';
import Quests from '../components/organisms/Quests';

export default function Divisions() {
  const [selectedView, setSelectedView] = useState('ranking');

  const divisionData = {
    division: 'bronce',
    points: 200,
  };

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
    <main className="relative flex min-h-screen w-full flex-col sm:min-w-[570px] sm:overflow-hidden">
      <HeaderDivision
        currentView={selectedView}
        onViewChange={setSelectedView}
      />
      <div className="flex-grow mb-[90px]">{renderContent()}</div>
      <FooterNavbar />
    </main>
  );
}
