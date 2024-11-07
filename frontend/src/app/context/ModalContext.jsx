import { createContext, useState, useContext } from 'react';
import { usePredictions } from './PredictionsContext';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedPredictionMatch, setSelectedPredictionMatch] = useState(null);
  const [journeyCount, setJourneyCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    addPrediction,
    resetPredictions,
    removeLastPrediction,
    getSelectedOption,
    getPredictionMatch,
  } = usePredictions();
  // console.log('selectedPredictionMatch ', selectedPredictionMatch);

  const openModal = (initialStep = 1) => {
    setIsModalOpen(true);
    setModalStep(initialStep);
    setJourneyCount(0);
    setSelectedOption(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setJourneyCount(0);
    setSelectedOption(null);
    setSelectedPredictionMatch(null);
    resetPredictions();
  };

  const handleNextStep = (nextStep) => {
    setModalStep(nextStep);
  };

  const handleNextJourney = () => {
    setJourneyCount((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (modalStep > 1) {
      if (modalStep === 3) {
        removeLastPrediction(); // Elimina la última predicción si estamos en el paso 3
        const selected = getSelectedOption(journeyCount);
        setSelectedOption(selected); // Retomo la selección del recorrido journeyCount
        const match = getPredictionMatch(journeyCount);
        setSelectedPredictionMatch(match); // Retomo el SeletedPredictionsMatch del recorrido journeyCount
      }
      // Retrocede al paso anterior dentro del mismo journey
      setModalStep((prev) => prev - 1);
    } else if (journeyCount > 0) {
      // Si estamos en el primer paso, retrocede al último paso del journey anterior
      setJourneyCount((prev) => prev - 1);
      setModalStep(4); // Asumiendo que el último paso es 4
    } else {
      // Si es el primer paso del primer journey, cierra el modal
      closeModal();
    }
  };

  const startNewJourney = (newPrediction) => {
    addPrediction({
      journeyCount: journeyCount,
      match: newPrediction,
      selectedMatch: selectedPredictionMatch,
    });
  };

  const handlePredictionMatch = (predictionMatch) => {
    setSelectedPredictionMatch(predictionMatch);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalStep,
        handleNextStep,
        handlePrevStep,
        journeyCount,
        handleNextJourney,
        startNewJourney,
        selectedOption,
        setSelectedOption,
        selectedPredictionMatch,
        handlePredictionMatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
