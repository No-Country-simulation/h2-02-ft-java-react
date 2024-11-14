import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatDateNav = (date) => {
  const formattedDate = format(new Date(date), 'dd MMM', { locale: es });
  // Quitamos el punto final de la abreviatura de mes
  return formattedDate.replace('.', '');
};

export const formatMatchTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateWithTime = (date) => {
  return format(new Date(date), "dd 'de' MMMM HH:mm 'hs'", { locale: es });
};

export const adjustDate = (baseDate, days) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
};

// Función para obtener un arreglo de fechas ajustadas para los próximos días
export const getUpcomingDays = () => {
  const daysArray = ['Todas'];
  for (let i = 0; i <= 5; i++) {
    daysArray.push(adjustDate(new Date(), i));
  }
  return daysArray;
};
