import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { useModal } from '../../context/ModalContext';
import Step1PredictionType from '../molecules/Step1PredictionType';
import Step2MatchResult from '../molecules/Step2MatchResult';
import Step3CombinedPrediction from '../molecules/Step3CombinedPrediction';
import Step4SelectMatch from '../molecules/Step4SelectMatch';
import PredictionsProgress from '../atoms/PredictionsProgress';
import PredictionAdded from '../atoms/PredictionAdded';

export default function ModalPredictions({ isOpen }) {
  const { modalStep, handlePrevStep, closeModal } = useModal();

  const [showPredictionAdded, setShowPredictionAdded] = useState(false);
  const navigate = useNavigate();

  // Maneja el envío exitoso de la predicción y cierra el modal
  const handleSubmitPrediction = () => {
    setShowPredictionAdded(true);
    setTimeout(() => {
      setShowPredictionAdded(false);
      closeModal();
      navigate('/match');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full min-h-screen items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative h-full max-h-[844px] w-full max-w-md overflow-y-auto bg-white">
        <div className="flex items-center justify-between p-5">
          <button onClick={handlePrevStep} className="text-purpleWaki">
            <HiArrowLeft size={24} />
          </button>

          <button onClick={closeModal} className="text-purpleWaki">
            <CgClose size={24} />
          </button>
        </div>

        {/* Control de flujo entre los pasos */}
        {modalStep === 1 && <Step1PredictionType />}
        {modalStep === 2 && (
          <Step2MatchResult handleSubmitPrediction={handleSubmitPrediction} />
        )}
        {modalStep === 3 && <Step3CombinedPrediction />}
        {modalStep === 4 && <Step4SelectMatch />}

        {/* Progreso de predicción */}
        <PredictionsProgress cantCircles={5} />

        {/* Mensaje de predicción añadida */}
        {showPredictionAdded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <PredictionAdded />
          </motion.div>
        )}
      </div>
    </div>
  );
}
