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

// Función para ajustar la fecha actual según un número de días
export const adjustDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Función para obtener un arreglo de fechas ajustadas para los próximos días
export const getUpcomingDays = () => {
  const daysArray = ['Todas'];
  for (let i = 0; i <= 5; i++) {
    daysArray.push(adjustDate(i));
  }
  return daysArray;
};
