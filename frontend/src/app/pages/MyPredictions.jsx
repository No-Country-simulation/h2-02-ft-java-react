import MyPredictionsHeader from '../components/organisms/MyPredictionsHeader';
import MyPredictionSection from '../components/organisms/MyPredictionSection';
import LogoBarcelona from '../../assets/barcelona.png';
import LogoOsasuna from '../../assets/osasuna.png';

const myPredictionsActivas = [
  {
    league: 'Liga española',
    selected: 'DRAW',
    homeTeam: {
      logoUrl: LogoBarcelona,
      name: 'Barcelona',
    },
    awayTeam: {
      logoUrl: LogoOsasuna,
      name: 'Osasuna',
    },
    points: 13,
    status: 'pending',
  },
  {
    league: 'Liga española',
    selected: 'AWAY',
    homeTeam: {
      logoUrl: LogoBarcelona,
      name: 'Barcelona',
    },
    awayTeam: {
      logoUrl: LogoOsasuna,
      name: 'Osasuna',
    },
    points: 13,
    status: 'lose',
  },
  {
    league: 'Liga española',
    selected: 'LOCAL',
    homeTeam: {
      logoUrl: LogoBarcelona,
      name: 'Barcelona',
    },
    awayTeam: {
      logoUrl: LogoOsasuna,
      name: 'Osasuna',
    },
    points: 13,
    status: 'win',
  },
  // Más predicciones...
];

const myPredictionsPasadas = [
  {
    league: 'La Liga',
    selected: 'Resultado final:',
    homeTeam: 'Barcelona',
    awayTeam: 'Osasuna',
    points: 13,
    status: 'ganado',
  },
  {
    league: 'La Liga',
    selected: 'Resultado final:',
    homeTeam: 'Barcelona',
    awayTeam: 'Osasuna',
    points: 13,
    status: 'perdido',
  },
  // Más predicciones...
];

export default function MyPredictions() {
  return (
    <div className="flex flex-col bg-gradientWaki">
      <MyPredictionsHeader />
      <MyPredictionSection />
    </div>
  );
}
