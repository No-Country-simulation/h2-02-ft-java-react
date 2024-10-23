import { useContext } from 'react';
import { MatchContext } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import PredictionsPronostico from '../atoms/PredictionsPronostico';
import YourPredictions from '../atoms/YourPredictions';
import Button from '../atoms/Button';
import ModalPredictions from '../organisms/ModalPredictions';

export default function PredictionsSections() {
  const { selectedMatch } = useContext(MatchContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <YourPredictions />
      {selectedMatch && (
        <Button className="mx-auto" onClick={() => openModal()}>
          Hacer predicción
        </Button>
      )}
      <PredictionsPronostico />

      {/* Modal que se muestra cuando isModalOpen es true */}
      <ModalPredictions
        isOpen={isModalOpen}
        onClose={closeModal}
        initialStep={1}
      />
    </div>
  );
}
