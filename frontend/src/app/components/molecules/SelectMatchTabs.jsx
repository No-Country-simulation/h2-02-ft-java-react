import { useState } from 'react';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { useDate } from '../../context/DateContext';
import {
  getUpcomingDays,
  formatDate,
  formatDateNav,
} from '../../utils/dateUtils';
import PredictionsProgress from '../atoms/PredictionsProgress';

export default function SelectMatchTabs() {
  const { updateSelectedDate } = useDate();
  const tabs = getUpcomingDays();
  const today = tabs[1];
  const [activeTab, setActiveTab] = useState(formatDateNav(today));

  const handleTabClick = (tab) => {
    setActiveTab(formatDateNav(tab));
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
            'bg-transparent border-b-[3px] border-label shadow-none rounded-none',
        }}
      >
        {tabs.slice(1).map((tab, index) => {
          const date = formatDate(tab);
          return (
            <Tab
              key={index}
              value={formatDateNav(tab)}
              onClick={() => handleTabClick(tab)}
              className={`px-4 pb-1 text-regularNav-16 transition-colors duration-300 ${
                activeTab === formatDateNav(tab)
                  ? 'font-medium text-label'
                  : 'text-grayWaki'
              }`}
              aria-selected={activeTab === formatDateNav(tab)}
            >
              <div className="flex flex-col items-center gap-2">
                <PredictionsProgress
                  totalPredictions={2}
                  date={date}
                  cantCircles={tab === today ? 5 : 2}
                />
                {tab === today ? 'Hoy' : formatDateNav(tab)}
              </div>
            </Tab>
          );
        })}
      </TabsHeader>
    </Tabs>
  );
}
