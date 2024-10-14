export default function BodyPredictionsCard({ team1, team2, points }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <p className="text-gray-500">
        {team1} vs {team2}
      </p>
      <p className="text-sm">{points}</p>
    </div>
  );
}
