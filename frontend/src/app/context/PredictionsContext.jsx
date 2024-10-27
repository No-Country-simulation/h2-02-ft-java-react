import { createContext, useContext, useState } from 'react';
import { getRemainingPredictionByDate } from '../services/profileService';
import { getPredictions } from '../services/predictionService';
import { useAuth } from '../context/AuthContext';

const PredictionsContext = createContext();

export const usePredictions = () => useContext(PredictionsContext);

export const PredictionsProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]); // Predicciones parciales (para combinadas)
  const [remainingPredictions, setRemainingPredictions] = useState(5);
  const [allPredictions, setAllPredictions] = useState([]); // Todas las predicciones
  const { userId } = useAuth();

  // Actualizar el número de predicciones restantes por fecha
  const fetchRemainingPredictions = async (date) => {
    try {
      const data = await getRemainingPredictionByDate(userId, date);
      setRemainingPredictions(data.remainingPredictions);
    } catch (error) {
      console.error('Error al obtener las predicciones restantes:', error);
    }
  };

  // Obtener todas las predicciones por ID de perfil
  const fetchAllPredictions = async () => {
    try {
      const data = await getPredictions(userId);
      setAllPredictions(data); // Almacena todas las predicciones
    } catch (error) {
      console.error('Error al obtener todas las predicciones:', error);
    }
  };

  const addPrediction = (newPrediction, isCombined) => {
    if (isCombined) {
      setPredictions([...predictions, newPrediction]);
    } else {
      setPredictions([...predictions, newPrediction]);
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
      }}
    >
      {children}
    </PredictionsContext.Provider>
  );
};
