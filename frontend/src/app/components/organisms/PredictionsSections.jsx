import { useEffect, useState } from 'react';
import { useMatch } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import {
  getPredictionByMatchId,
  getPredictionExistenceByMatchId,
} from '../../services/predictionService';
import PredictionsPronostico from '../atoms/PredictionsPronostico';
import YourPredictions from '../atoms/YourPredictions';
import Button from '../atoms/Button';

export default function PredictionsSections() {
  const { selectedMatch } = useMatch();
  const { openModal } = useModal();
  const { userId } = useAuth();
  const [predictionData, setPredictionData] = useState(null);
  const [predictionExists, setPredictionExists] = useState(false);

  useEffect(() => {
    const checkPredictionExistence = async () => {
      try {
        const exists = await getPredictionExistenceByMatchId(
          userId,
          selectedMatch.id
        );
        setPredictionExists(exists);

        if (exists) {
          const data = await getPredictionByMatchId(userId, selectedMatch.id);
          setPredictionData(data);
        }
      } catch (error) {
        console.error(
          'Error al verificar la existencia de la predicción:',
          error
        );
      }
    };

    checkPredictionExistence();
  }, [userId, selectedMatch.id]);

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <YourPredictions
        predictionData={predictionData}
        matchStatus={selectedMatch.status}
      />
      {selectedMatch.status !== 'FT' && (
        <Button
          className="mx-auto"
          onClick={() => openModal()}
          disabled={predictionExists || selectedMatch.odds.localWin === 'N/A'}
        >
          Hacer predicción
        </Button>
      )}
      <PredictionsPronostico />
    </div>
  );
}
