import { createContext, useContext, useState, useEffect } from 'react';
import { getRemainingPredictionByDate } from '../services/profileService';
import { getPredictions } from '../services/predictionService';
import { useAuth } from '../context/AuthContext';

const PredictionsContext = createContext();

export const usePredictions = () => useContext(PredictionsContext);

export const PredictionsProvider = ({ children }) => {
  const { userId } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [remainingPredictions, setRemainingPredictions] = useState(5);
  const [allPredictions, setAllPredictions] = useState([]);
  console.log('predictions', predictions);

  const resetPredictions = () => setPredictions([]);

  const fetchRemainingPredictions = async (date) => {
    try {
      const data = await getRemainingPredictionByDate(userId, date);
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

  const addPrediction = (newPrediction) => {
    setPredictions([...predictions, newPrediction]);
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
      }}
    >
      {children}
    </PredictionsContext.Provider>
  );
};
