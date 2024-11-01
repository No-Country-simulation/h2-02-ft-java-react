import { useState, useEffect } from 'react';
import { useDate } from '../../context/DateContext';
import { getUpcomingDays, formatDateNav } from '../../utils/dateUtils';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function MyPredictionTabs() {
  const { updateSelectedDate } = useDate();
  const tabsDays = getUpcomingDays();
  const [activeTab, setActiveTab] = useState(tabsDays[0]);

  useEffect(() => {
    updateSelectedDate(tabsDays[0]);
  }, []);

  const handleTabClick = (tab) => {
    const formattedTab = tab !== 'Todas' ? formatDateNav(tab) : tab;
    setActiveTab(formattedTab);
    updateSelectedDate(tab);
  };

  return (
    <Tabs
      value={activeTab}
      className="w-full overflow-x-auto"
      onChange={(tab) => handleTabClick(tab)}
    >
      <TabsHeader
        className="flex w-full justify-between space-x-4 whitespace-nowrap rounded-none bg-transparent p-0"
        indicatorProps={{
          className:
            'bg-transparent border-b-[3px] border-white shadow-none rounded-none',
        }}
      >
        {tabsDays.map((tab, index) => (
          <Tab
            key={index}
            value={tab !== 'Todas' ? formatDateNav(tab) : tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-3 text-regularNav-16 transition-colors duration-300 ${
              (index === 0 && activeTab === 'Todas') ||
              (index !== 0 && activeTab === formatDateNav(tab))
                ? 'font-medium text-white'
                : 'text-[rgba(255,255,255,0.65)]'
            }`}
          >
            {tab === 'Todas'
              ? 'Todas'
              : index === 1
                ? 'Hoy'
                : formatDateNav(tab)}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
