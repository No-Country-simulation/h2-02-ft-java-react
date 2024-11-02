import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function PredictionsNavbar({ activeTab, setActiveTab }) {
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
          value="left"
          onClick={() => handleTabChange('left')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'left' ? 'font-medium text-blueWaki' : 'text-grayWaki'
          }`}
        >
          Predicciones
        </Tab>
        <Tab
          value="center"
          onClick={() => handleTabChange('center')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'center'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Detalles
        </Tab>
        <Tab
          value="right"
          onClick={() => handleTabChange('right')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            activeTab === 'right'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Clasificación
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
