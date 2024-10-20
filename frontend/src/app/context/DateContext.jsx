import { createContext, useState } from 'react';

export const DateContext = createContext();

// Función para formatear la fecha
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatDateNav = (date) => {
  const options = { day: '2-digit', month: 'short' };
  return date.toLocaleDateString('es-ES', options);
};

export const DateProvider = ({ children }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Función para actualizar la fecha y formatearla
  const updateDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider
      value={{ selectedDate, updateDate, formatDate, formatDateNav }}
    >
      {children}
    </DateContext.Provider>
  );
};
