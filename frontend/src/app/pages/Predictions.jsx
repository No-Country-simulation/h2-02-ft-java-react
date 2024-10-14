import PredictionsHeader from '../components/organisms/PredictionsHeader';
import PredictionSection from '../components/organisms/PredictionSection';

const predictionsActivas = [
  {
    league: 'Liga española',
    result: 'En Juego',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'pending',
  },
  {
    league: 'Liga española',
    result: 'Osasuna',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'lose',
  },
  {
    league: 'Liga española',
    result: 'Barcelona',
    team1: 'Barcelona',
    team2: 'Osasuna',
    points: 13,
    status: 'win',
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
      <PredictionSection title={'Activas'} predictions={predictionsActivas} />
    </div>
  );
}
