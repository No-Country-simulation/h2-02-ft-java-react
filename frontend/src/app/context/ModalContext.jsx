import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const openModal = (step) => {
    setModalStep(step || 1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setSelectedOption(null);
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
