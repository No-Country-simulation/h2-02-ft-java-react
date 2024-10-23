import { createContext, useState, useContext } from 'react';

// Creamos el contexto
const ModalContext = createContext();

// Hook personalizado para usar el contexto
export const useModal = () => useContext(ModalContext);

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // Para manejar datos pasados al modal (opcional)

  const openModal = (data) => {
    setModalData(data || null); // Opcional: pasar datos al modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
