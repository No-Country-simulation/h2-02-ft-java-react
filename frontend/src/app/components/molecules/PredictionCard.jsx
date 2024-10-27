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
      finalResult,
      homeTeam,
      awayTeam,
      homeShield,
      awayShield,
    },
  ],
}) {
  return (
    <div className="flex flex-col divide-y overflow-hidden rounded-large shadow-[0_0_14.6px_0_rgba(0,0,0,0.2)]">
      <HeaderLeague league={competition} />

      <BodyPredictionsCard
        selected={finalResult}
        homeTeam={{ name: homeTeam, shield: homeShield }}
        awayTeam={{ name: awayTeam, shield: awayShield }}
        points={points}
        status={status}
      />

      <StatusPredictionsCard status={status} points={totalPoints} />
    </div>
  );
}
