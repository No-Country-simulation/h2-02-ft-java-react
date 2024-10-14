import BodyPredictionsCard from '../atoms/BodyPredictionsCard';
import HeaderLeague from '../atoms/HeaderLeague';
import StatusPredictionsCard from '../atoms/StatusPredictionsCard';

export function PredictionCard({
  league,
  result,
  team1,
  team2,
  points,
  status,
}) {
  return (
    <div className="flex flex-col divide-y-2 overflow-hidden rounded-large shadow-[0_0_14.6px_0_rgba(0,0,0,0.2)]">
      <HeaderLeague league={league} result={result} />
      <BodyPredictionsCard team1={team1} team2={team2} points={points} />
      <StatusPredictionsCard status={status} points={points} />
    </div>
  );
}
