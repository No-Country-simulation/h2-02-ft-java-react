import PredictionsPronostico from '../atoms/PredictionsPronostico';
import YourPredictions from '../atoms/YourPredictions';
import Button from '../atoms/Button';

export default function PredictionsSections() {
  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <YourPredictions />
      <Button className="mx-auto">Hacer predicción</Button>
      <PredictionsPronostico />
    </div>
  );
}
