import { useEffect, useState } from 'react';
import { getPredictionByDate } from '../services/predictionService';
import { formatDate } from './dateUtils';

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

// Función para calcular los puntos de una predicción según la opción seleccionada
export const calculatePoints = (selectedOption, matchPredictions) => {
  return selectedOption === 'LOCAL'
    ? matchPredictions.localWin
    : selectedOption === 'DRAW'
      ? matchPredictions.draw
      : matchPredictions.visitorWin;
};

export const getTeamName = (selectedOption, localTeam, visitorTeam) => {
  return selectedOption === 'LOCAL'
    ? localTeam.name
    : selectedOption === 'AWAY'
      ? visitorTeam.name
      : 'Empate';
};
