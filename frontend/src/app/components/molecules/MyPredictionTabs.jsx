import { useState, useEffect } from 'react';
import { useDate } from '../../context/DateContext';
import { getUpcomingDays, formatDateNav } from '../../utils/dateUtils';

export default function MyPredictionTabs() {
  const { updateSelectedDate } = useDate();
  const tabs = getUpcomingDays();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    updateSelectedDate(tabs[0]);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab !== 'Todas' ? formatDateNav(tab) : tab);
    updateSelectedDate(tab);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-full justify-between space-x-4 whitespace-nowrap">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-3 text-regularNav-16 transition-colors duration-300 ${
              (index === 0 && activeTab === 'Todas') ||
              (index !== 0 && activeTab === formatDateNav(tab))
                ? 'border-b-[3px] border-white font-medium text-white'
                : 'text-[rgba(255,255,255,0.65)]'
            }`}
          >
            {tab === 'Todas'
              ? 'Todas'
              : index === 1
                ? 'Hoy'
                : formatDateNav(tab)}
          </button>
        ))}
      </div>
    </div>
  );
}
