import { useEffect, useState } from 'react';
import { useMatch } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { getPredictionByMatchId } from '../../services/predictionService';
import PredictionsPronostico from '../atoms/PredictionsPronostico';
import YourPredictions from '../atoms/YourPredictions';
import Button from '../atoms/Button';

export default function PredictionsSections() {
  const { selectedMatch } = useMatch();

  const { openModal } = useModal();
  const { userId } = useAuth();
  const [predictionData, setPredictionData] = useState(null);
  const [predictionExists, setPredictionExists] = useState(false);
  console.log(selectedMatch);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const data = await getPredictionByMatchId(userId, selectedMatch.id);
        setPredictionData(data);
        if (data) setPredictionExists(true);
      } catch (error) {
        console.error('Error al obtener la predicción:', error);
      }
    };

    if (selectedMatch.id) {
      fetchPredictionData();
    }
  }, []);

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
          disabled={predictionExists}
        >
          Hacer predicción
        </Button>
      )}
      <PredictionsPronostico />
    </div>
  );
}
