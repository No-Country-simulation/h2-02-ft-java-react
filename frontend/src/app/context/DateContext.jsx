import { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('selectedDate ', selectedDate);

  const updateSelectedDate = (newDate) => {
    setSelectedDate(newDate === 'Todas' ? null : newDate);
  };

  return (
    <DateContext.Provider value={{ selectedDate, updateSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};
