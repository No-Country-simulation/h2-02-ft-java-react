import { useState, useEffect } from 'react';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { useDate } from '../../context/DateContext';
import { adjustDate, formatDateNav } from '../../utils/dateUtils';

export default function MatchNavbar() {
  const { updateSelectedDate, selectedDate } = useDate();

  // Inicializa con selectedDate como "hoy", junto con ayer y mañana relativos
  const [dates, setDates] = useState({
    today: selectedDate,
    yesterday: adjustDate(selectedDate, -1),
    tomorrow: adjustDate(selectedDate, 1),
  });

  useEffect(() => {
    // Actualiza las fechas relativas cada vez que cambia selectedDate
    setDates({
      today: selectedDate,
      yesterday: adjustDate(selectedDate, -1),
      tomorrow: adjustDate(selectedDate, 1),
    });
  }, [selectedDate]);

  const handleTabChange = (tab) => {
    const dateMap = {
      yesterday: dates.yesterday,
      today: dates.today,
      tomorrow: dates.tomorrow,
    };

    // Actualiza el contexto y la fecha seleccionada
    const newSelectedDate = dateMap[tab];
    updateSelectedDate(newSelectedDate);

    // Reajusta las fechas en torno a la nueva fecha "hoy"
    setDates({
      today: newSelectedDate,
      yesterday: adjustDate(newSelectedDate, -1),
      tomorrow: adjustDate(newSelectedDate, 1),
    });
  };

  return (
    <Tabs value="today" className="w-full">
      <TabsHeader
        className="grid grid-cols-3 whitespace-nowrap rounded-none bg-transparent p-0 pt-5"
        indicatorProps={{
          className: 'bg-transparent shadow-none rounded-none',
        }}
      >
        <Tab
          value="yesterday"
          onClick={() => handleTabChange('yesterday')}
          className={`px-4 pb-[5px] pt-2 text-regularNav-16 text-grayWaki transition-colors duration-300`}
        >
          {formatDateNav(dates.yesterday) === formatDateNav(new Date())
            ? 'Hoy'
            : formatDateNav(dates.yesterday)}
        </Tab>
        <Tab
          value="today"
          onClick={() => handleTabChange('today')}
          className={`border-b-[3px] border-blueWaki px-4 pb-[5px] pt-2 text-regularNav-16 font-medium text-blueWaki transition-colors duration-300`}
        >
          {formatDateNav(dates.today) === formatDateNav(new Date())
            ? 'Hoy'
            : formatDateNav(dates.today)}
        </Tab>
        <Tab
          value="tomorrow"
          onClick={() => handleTabChange('tomorrow')}
          className={`px-4 pb-[5px] pt-2 text-regularNav-16 text-grayWaki transition-colors duration-300`}
        >
          {formatDateNav(dates.tomorrow) === formatDateNav(new Date())
            ? 'Hoy'
            : formatDateNav(dates.tomorrow)}
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
