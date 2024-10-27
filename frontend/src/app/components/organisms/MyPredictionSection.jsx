import { useEffect } from 'react';
import AnchorButton from '../atoms/AnchorButton';
import { PredictionCard } from '../molecules/PredictionCard';
import { usePredictions } from '../../context/PredictionsContext';

export default function PredictionSection() {
  const { allPredictions, fetchAllPredictions } = usePredictions();
  const pastPredictions = allPredictions.filter(
    (prediction) => prediction.status !== 'PENDING'
  );

  useEffect(() => {
    fetchAllPredictions();
  }, []);

  return (
    <div className="rounded-t-large bg-white p-5">
      {/* Predicciones activas */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-medium-18 font-medium text-blueWaki">Activas</h3>
        <AnchorButton to="/match">Hacer predicción</AnchorButton>
      </div>
      <ul className="mb-2 grid grid-cols-[1fr_1fr_50px] items-center rounded-large px-4 py-2 shadow-custom">
        <li className="text-regular-12 text-grayLightWaki">Predicción</li>
        <li className="text-regular-12 text-grayLightWaki">Partido</li>
        <li className="text-center text-regular-12 text-grayLightWaki">
          Puntos
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        {allPredictions
          .filter((prediction) => prediction.status === 'PENDING')
          .map((prediction, index) => (
            <PredictionCard key={index} {...prediction} />
          ))}
      </div>
      {/* Predicciones pasadas */}
      {pastPredictions.length > 0 && (
        <>
          <h3 className="my-5 text-medium-18 font-medium text-blueWaki">
            Pasadas
          </h3>
          <div className="flex flex-col gap-2">
            {pastPredictions.map((prediction, index) => (
              <PredictionCard key={index} {...prediction} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
