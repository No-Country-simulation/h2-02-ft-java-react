import { useModal } from '../../context/ModalContext';
import { TbSoccerField } from 'react-icons/tb';
import { TbPlayFootball } from 'react-icons/tb';

export default function Step1PredictionType() {
  const { setSelectedOption, handleNextStep } = useModal();

  // Maneja la selección de predicción en Step 1 y avanza a Step 2
  const handlePrediction = (prediction) => {
    setSelectedOption(prediction);
    handleNextStep(2);
  };

  return (
    <section className="flex flex-col divide-y">
      <div className="flex flex-col pb-5">
        <h2 className="text-center text-semibold-22 font-semibold text-label">
          ¿Qué vas a predecir?
        </h2>
        <p className="text-center text-medium-18 font-medium text-grayWaki">
          Selecciona una opción
        </p>
      </div>
      <div className="flex flex-col gap-4 px-10 py-7">
        {/* Botón para seleccionar "Resultado Final" */}
        <button
          className="flex items-center gap-2 rounded-large border border-transparent bg-white p-5 text-medium-18 font-medium text-label shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-blueWaki"
          onClick={() => handlePrediction('RESULTADO_FINAL')}
        >
          <TbSoccerField size={36} className="text-blueWaki" />
          Resultado final
        </button>

        {/* Botón para seleccionar "Goles" - deshabilitado temporalmente */}
        <button
          className="flex items-center gap-2 rounded-large border border-transparent bg-white p-5 text-medium-18 font-medium text-label shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-blueWaki disabled:border-transparent disabled:bg-gray-200"
          disabled
          onClick={() => handlePrediction('GOLES')}
        >
          <TbPlayFootball size={36} className="text-blueWaki" />
          Goles (Próximamente)
        </button>
      </div>
    </section>
  );
}
