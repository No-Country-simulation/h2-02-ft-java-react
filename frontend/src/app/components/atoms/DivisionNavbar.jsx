import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function DivisionNavbar({ activeTab, setActiveTab }) {
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
          value="ranking"
          onClick={() => handleTabChange('ranking')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'ranking'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Ranking
        </Tab>
        <Tab
          value="rewards"
          onClick={() => handleTabChange('rewards')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'rewards'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Rewards
        </Tab>
        <Tab
          value="quests"
          onClick={() => handleTabChange('quests')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'quests'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Quests
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
