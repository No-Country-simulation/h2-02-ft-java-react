import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function PlayerNavbar({ activeTab, setActiveTab }) {
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsHeader
        className="grid grid-cols-2 whitespace-nowrap rounded-none bg-transparent p-0 pt-5"
        indicatorProps={{
          className:
            'bg-transparent border-b-[3px] border-blueWaki shadow-none rounded-none',
        }}
      >
        <Tab
          value="detalles"
          onClick={() => handleTabChange('detalles')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'detalles'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Detalles
        </Tab>
        <Tab
          value="token"
          onClick={() => handleTabChange('token')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'token'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Token
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
