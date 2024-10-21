import { useState } from 'react';

export default function MyPredictionTabs() {
  const [activeTab, setActiveTab] = useState('Todas');

  const tabs = [
    'Todas',
    'Hoy',
    '26 Sep',
    '27 Sep',
    '28 Sep',
    '29 Sep',
    '30 Sep',
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-full justify-between space-x-4 whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-3 text-regularNav-16 transition-colors duration-300 ${
              activeTab === tab
                ? 'border-b-[3px] border-white font-medium text-white'
                : 'text-[rgba(255,255,255,0.65)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
