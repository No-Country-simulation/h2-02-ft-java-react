import { createContext, useState, useContext } from 'react';
import { usePredictions } from '../context/PredictionsContext';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const { resetPredictions } = usePredictions();
  console.log('selectedOption', selectedOption);

  const openModal = (step) => {
    setModalStep(step || 1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setSelectedOption(null);
    resetPredictions();
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalStep,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
