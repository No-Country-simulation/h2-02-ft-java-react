import { useEffect, useState } from 'react';
import { usePredictions } from '../../context/PredictionsContext';
import { useAuth } from '../../context/AuthContext';
import { fetchProfileAndCheckPredictions } from '../../utils/profileUtils';
import {
  ActivePredictions,
  NoPredictions,
} from '../atoms/PredictionsComponents';
import {
  ListActivePredictions,
  ListPastPredictions,
} from '../molecules/ListPredictions';
import { PredictionsByDate } from '../../utils/predictionUtils';

export default function MyPredictionSection() {
  const { allPredictions, fetchAllPredictions } = usePredictions();
  const { userId } = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const pastPredictions = allPredictions.filter(
    (prediction) => prediction.status !== 'PENDING'
  );
  // console.log(pastPredictions.length > 0);

  const datePredictions = PredictionsByDate(userId);
  // const matchingPredictions = allPredictions.filter((prediction) =>
  //   datePredictions.some(
  //     (datePrediction) =>
  //       datePrediction.predictionDetailsId === prediction.predictionDetailsId
  //   )
  // );
  // console.log('matchingPredictions ', matchingPredictions);

  // Verifica si se deben obtener las predicciones
  useEffect(() => {
    const checkPredictions = async () => {
      const canFetchPredictions = await fetchProfileAndCheckPredictions(userId);
      setShouldFetch(canFetchPredictions);
    };
    checkPredictions();
  }, []);

  // Solo llama a fetchAllPredictions si `shouldFetch` es true
  useEffect(() => {
    if (!shouldFetch) {
      fetchAllPredictions();
    }
  }, []);

  return (
    <div className="min-h-72 rounded-t-large bg-white p-5">
      {shouldFetch ? (
        <NoPredictions />
      ) : (
        <>
          {/* Predicciones activas */}
          <ActivePredictions />
          <ListActivePredictions activePredictions={allPredictions} />
          {/* Predicciones pasadas */}
          {pastPredictions.length > 0 && (
            <ListPastPredictions pastPredictions={pastPredictions} />
          )}
        </>
      )}
    </div>
  );
}
