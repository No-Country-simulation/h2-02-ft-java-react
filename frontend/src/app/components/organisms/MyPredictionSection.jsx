import { useEffect } from 'react';
import AnchorButton from '../atoms/AnchorButton';
import { PredictionCard } from '../molecules/PredictionCard';
import { usePredictions } from '../../context/PredictionsContext';

export default function PredictionSection() {
  const { allPredictions, fetchAllPredictions } = usePredictions();

  useEffect(() => {
    fetchAllPredictions();
  }, []);

  return (
    <div className="rounded-t-large bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-medium-18 font-medium text-blueWaki">
          Predicciones
        </h3>
        <AnchorButton>Hacer predicción</AnchorButton>
      </div>
      <ul className="mb-2 grid grid-cols-[1fr_1fr_50px] items-center rounded-large px-4 py-2 shadow-[0_0_14.6px_0_rgba(0,0,0,0.2)]">
        <li className="text-regular-12 text-grayLightWaki">Predicción</li>
        <li className="text-regular-12 text-grayLightWaki">Partido</li>
        <li className="text-regular-12 text-grayLightWaki">Puntos</li>
      </ul>
      <div className="flex flex-col gap-2">
        {allPredictions.map((prediction, index) => (
          <PredictionCard key={index} {...prediction} />
        ))}
      </div>
    </div>
  );
}
