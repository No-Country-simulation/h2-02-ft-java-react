import { useEffect, useState } from 'react';
import { getPredictionByDate } from '../services/predictionService';
import { formatDate } from '../utils/dateUtils';

export function usePredictionsByDate(userId, selectedDate) {
  const [datePredictions, setDatePredictions] = useState([]);

  useEffect(() => {
    setDatePredictions([]);
    const fetchPredictionsByDate = async () => {
      if (selectedDate) {
        try {
          const data = await getPredictionByDate(
            userId,
            formatDate(selectedDate)
          );
          setDatePredictions(data);
        } catch (error) {
          console.error('Error al obtener predicciones por fecha:', error);
        }
      }
    };
    fetchPredictionsByDate();
  }, [userId, selectedDate]);

  return datePredictions;
}
