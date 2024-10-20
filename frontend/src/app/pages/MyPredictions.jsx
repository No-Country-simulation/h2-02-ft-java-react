import MyPredictionsHeader from '../components/organisms/MyPredictionsHeader';
import MyPredictionsection from '../components/organisms/MyPredictionsection';

const myPredictionsActivas = [
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

const myPredictionsPasadas = [
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

export default function MyPredictions() {
  return (
    <div className="flex flex-col bg-gradientWaki">
      <MyPredictionsHeader />
      <MyPredictionsection
        title={'Activas'}
        predictions={myPredictionsActivas}
      />
    </div>
  );
}
