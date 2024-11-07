import { useEffect, useState } from 'react';
import { usePredictions } from '../context/PredictionsContext';
import { getPredictionByDate } from '../services/predictionService';
import { formatDate } from '../utils/dateUtils';

export function usePredictionsByDate(userId, selectedDate) {
  const { remainingPredictions, fetchRemainingPredictions } = usePredictions();
  const [datePredictions, setDatePredictions] = useState([]);

  useEffect(() => {
    setDatePredictions([]);
    const fetchPredictionsByDate = async () => {
      if (selectedDate !== null) {
        fetchRemainingPredictions(selectedDate);
      }
      // Realiza el fetch solo si remainingPredictions es menor a 5
      if (selectedDate !== null && remainingPredictions < 5) {
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
  }, [userId, selectedDate, remainingPredictions]);

  return datePredictions;
}
