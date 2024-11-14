import { createContext, useContext, useState, useEffect } from 'react';
import { getRemainingPredictionByDate } from '../services/profileService';
import { getPredictions } from '../services/predictionService';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/dateUtils';

const PredictionsContext = createContext();

export const usePredictions = () => useContext(PredictionsContext);

export const PredictionsProvider = ({ children }) => {
  const { userId } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [remainingPredictions, setRemainingPredictions] = useState(5);
  const [allPredictions, setAllPredictions] = useState([]);
  // console.log(allPredictions);

  const resetPredictions = () => setPredictions([]);

  const fetchRemainingPredictions = async (date) => {
    const formattedDate = typeof date === 'string' ? date : formatDate(date);
    if (!formattedDate) return;
    try {
      const data = await getRemainingPredictionByDate(userId, formattedDate);
      setRemainingPredictions(data.remainingPredictions);
    } catch (error) {
      console.error('Error al obtener las predicciones restantes:', error);
    }
  };

  const fetchAllPredictions = async () => {
    try {
      const data = await getPredictions(userId);
      setAllPredictions(data);
    } catch (error) {
      console.error('Error al obtener todas las predicciones:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAllPredictions();
    }
  }, [userId]);

  useEffect(() => {
    if (predictions.length) {
      const latestDate = predictions[predictions.length - 1]?.match.matchDay;
      if (latestDate) fetchRemainingPredictions(latestDate);
    }
  }, [predictions]);

  const addPrediction = (newPrediction) => {
    if (predictions.length <= remainingPredictions) {
      setPredictions([...predictions, newPrediction]);
    } else {
      console.warn('Límite de predicciones alcanzado para esta fecha.');
    }
  };

  const removeLastPrediction = () => {
    setPredictions((prev) => prev.slice(0, -1));
  };

  const getSelectedOption = (journeyCount) => {
    const selected = predictions[journeyCount]?.match.expectedResult;
    return selected;
  };

  const getPredictionMatch = (journeyCount) => {
    const selectedMatch = predictions[journeyCount]?.selectedMatch;
    return selectedMatch;
  };

  const getPredictionsCountByDate = (date) => {
    return predictions.filter(
      (prediction) => prediction.match.matchDay === date
    ).length;
  };

  const isDateLimitReached = (date, cantPredictions) => {
    const predictionsCountForDate =
      predictions.length > 0 ? getPredictionsCountByDate(date) : 0;
    const predictionsMadeToday = 5 - remainingPredictions;
    if (cantPredictions === 5) {
      return predictionsMadeToday + predictionsCountForDate === 5;
    } else if (cantPredictions === 2) {
      if (remainingPredictions > 3) {
        // Si remainingPredictions - predictionsCount === 3, el límite ha sido alcanzado
        return remainingPredictions - predictionsCountForDate === 3;
      }
    }
  };

  return (
    <PredictionsContext.Provider
      value={{
        predictions,
        addPrediction,
        remainingPredictions,
        fetchRemainingPredictions,
        allPredictions,
        fetchAllPredictions,
        resetPredictions,
        removeLastPrediction,
        getSelectedOption,
        getPredictionMatch,
        getPredictionsCountByDate,
        isDateLimitReached,
      }}
    >
      {children}
    </PredictionsContext.Provider>
  );
};
