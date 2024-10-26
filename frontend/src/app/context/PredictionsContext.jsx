import { createContext, useContext, useState } from 'react';

const PredictionsContext = createContext();

export const usePredictions = () => useContext(PredictionsContext);

export const PredictionsProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);

  const addPrediction = (newPrediction, isCombined) => {
    if (isCombined) {
      setPredictions([...predictions, newPrediction]);
    } else {
      setPredictions([...predictions, newPrediction]);
    }
  };
  // console.log('predictions ', predictions);

  return (
    <PredictionsContext.Provider value={{ predictions, addPrediction }}>
      {children}
    </PredictionsContext.Provider>
  );
};
