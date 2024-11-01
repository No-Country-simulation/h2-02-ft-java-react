import { createContext, useState, useContext } from 'react';
import { usePredictions } from './PredictionsContext';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stepHistory, setStepHistory] = useState([]);
  const [journeyCount, setJourneyCount] = useState(1);

  const { predictions, removeLastPrediction, resetPredictions } =
    usePredictions();

  const openModal = (step = 1) => {
    setModalStep(step);
    setIsModalOpen(true);
    setStepHistory([step]);
    setJourneyCount(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setSelectedOption(null);
    setStepHistory([]);
    setJourneyCount(1);
    resetPredictions();
  };

  const handleNextStep = (nextStep) => {
    setModalStep(nextStep);
    setStepHistory((prev) => [...prev, nextStep]);
  };

  const handlePrevStep = () => {
    if (modalStep > 1) {
      if (modalStep === 3 && predictions.length > 0) {
        removeLastPrediction();
      }

      const previousStep = stepHistory[stepHistory.length - 2];
      setStepHistory((prev) => prev.slice(0, -1));
      setModalStep(previousStep || 1);
    } else if (journeyCount > 1) {
      setJourneyCount((prev) => prev - 1);
      setModalStep(4);
    } else {
      closeModal();
    }
  };

  const startNewJourney = () => {
    setJourneyCount((prev) => prev + 1);
    setModalStep(1);
    setStepHistory([1]);
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
        selectedOption,
        setSelectedOption,
        stepHistory,
        journeyCount,
        startNewJourney,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
