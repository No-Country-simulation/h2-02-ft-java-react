import { BodyPredictionsCard } from '../atoms/BodyPredictionsCard';
import HeaderLeague from '../atoms/HeaderLeague';
import StatusPredictionsCard from '../atoms/StatusPredictionsCard';

export function PredictionCard({
  totalPoints,
  status,
  match: [
    {
      competition,
      points,
      expectedResult,
      homeTeam,
      awayTeam,
      homeShield,
      awayShield,
      competitionShield,
    },
  ],
}) {
  return (
    <div className="flex flex-col divide-y overflow-hidden rounded-large shadow-custom">
      <HeaderLeague
        league={competition}
        competitionShield={competitionShield}
      />

      <BodyPredictionsCard
        selected={expectedResult}
        homeTeam={{ name: homeTeam, logoUrl: homeShield }}
        awayTeam={{ name: awayTeam, logoUrl: awayShield }}
        points={points}
        status={status}
      />

      <StatusPredictionsCard status={status} points={totalPoints} />
    </div>
  );
}
