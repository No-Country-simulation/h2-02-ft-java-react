import { useState } from 'react';
import Step1PredictionType from '../molecules/Step1PredictionType';
import Step2MatchResult from '../molecules/Step2MatchResult';
import Step3CombinedPrediction from '../molecules/Step3CombinedPrediction';
import Step4SelectMatch from '../molecules/Step4SelectMatch';
import { HiArrowLeft } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import PredictionsProgress from '../atoms/PredictionsProgress';

export default function ModalPredictions({ isOpen, onClose, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);
  const [predictions, setPredictions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handlePrediction = (prediction) => {
    setSelectedOption(prediction);
    handleNextStep();
  };

  const handleMakeCombinedPrediction = () => {
    setPredictions([...predictions, selectedOption]);
    handleNextStep();
  };

  const handleSelectMatch = (match) => {
    setStep(1); // Volvemos al paso 1 para hacer una nueva predicción
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-screen w-full max-w-md overflow-y-auto bg-white p-5">
        <div className="flex items-center justify-between pb-5">
          {/* Botón "Volver" */}
          <button
            onClick={() => {
              if (step > 1) {
                handlePrevStep(); // Volver al paso anterior
              } else {
                onClose(); // Cerrar el modal si es el paso 1
              }
            }}
            className="text-purpleWaki"
          >
            <HiArrowLeft size={24} />
          </button>

          {/* Botón para cerrar el modal */}
          <button onClick={onClose} className="text-purpleWaki">
            <CgClose size={24} />
          </button>
        </div>

        {/* Renderizar los pasos */}
        {step === 1 && (
          <Step1PredictionType handlePrediction={handlePrediction} />
        )}

        {step === 2 && (
          <Step2MatchResult
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            handleSubmitPrediction={() =>
              alert(`Predicción enviada: ${selectedOption}`)
            }
            handleMakeCombinedPrediction={handleMakeCombinedPrediction}
          />
        )}

        {step === 3 && (
          <Step3CombinedPrediction
            handleNextStep={handleNextStep}
            handlePrediction={handlePrediction}
          />
        )}

        {step === 4 && (
          <Step4SelectMatch handleSelectMatch={handleSelectMatch} />
        )}

        <PredictionsProgress usedPredictions={3} />
      </div>
    </div>
  );
}
