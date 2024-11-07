import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function ScoutPlayerNavbar({ activeTab, setActiveTab }) {
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsHeader
        className="grid grid-cols-3 whitespace-nowrap rounded-none bg-transparent p-0 pt-5"
        indicatorProps={{
          className:
            'bg-transparent border-b-[3px] border-blueWaki shadow-none rounded-none',
        }}
      >
        <Tab
          value="ranking-scout"
          onClick={() => handleTabChange('ranking-scout')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'ranking-scout'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Ranking
        </Tab>
        <Tab
          value="market"
          onClick={() => handleTabChange('market')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'market'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Market
        </Tab>
        <Tab
          value="estadisticas-token"
          onClick={() => handleTabChange('estadisticas-token')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'estadisticas-token'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Token statistics
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
