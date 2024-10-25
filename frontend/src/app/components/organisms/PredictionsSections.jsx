import { useMatch } from '../../context/MatchContext';
import { useModal } from '../../context/ModalContext';
import PredictionsPronostico from '../atoms/PredictionsPronostico';
import YourPredictions from '../atoms/YourPredictions';
import Button from '../atoms/Button';

export default function PredictionsSections() {
  const { selectedMatch } = useMatch();
  const { openModal } = useModal();

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <YourPredictions />
      {selectedMatch && (
        <Button className="mx-auto" onClick={() => openModal()}>
          Hacer predicción
        </Button>
      )}
      <PredictionsPronostico />
    </div>
  );
}
