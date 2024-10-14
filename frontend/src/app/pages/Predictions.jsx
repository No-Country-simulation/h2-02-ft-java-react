import PredictionsHeader from '../components/organisms/PredictionsHeader';
import PredictionSection from '../components/organisms/PredictionSection';

const predictionsActivas = [
  {
    league: 'La Liga',
    result: 'Resultado final:',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'pendiente',
  },
  // Más predicciones...
];

const predictionsPasadas = [
  {
    league: 'La Liga',
    result: 'Resultado final:',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'ganado',
  },
  {
    league: 'La Liga',
    result: 'Resultado final:',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'perdido',
  },
  // Más predicciones...
];

export default function Predictions() {
  return (
    <div className="flex flex-col bg-gradientWaki">
      <PredictionsHeader />
      <PredictionSection title={'título'} predictions={predictionsActivas} />
    </div>
  );
}
