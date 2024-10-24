import { BodyPredictionsCard } from '../atoms/BodyPredictionsCard';
import HeaderLeague from '../atoms/HeaderLeague';
import StatusPredictionsCard from '../atoms/StatusPredictionsCard';

export function PredictionCard({
  league,
  selected,
  team1,
  team2,
  points,
  status,
}) {
  return (
    <div className="flex flex-col divide-y overflow-hidden rounded-large shadow-[0_0_14.6px_0_rgba(0,0,0,0.2)]">
      <HeaderLeague league={league} />
      <BodyPredictionsCard
        selected={selected}
        team1={team1}
        team2={team2}
        points={points}
        status={status}
      />
      <StatusPredictionsCard status={status} points={points} />
    </div>
  );
}
