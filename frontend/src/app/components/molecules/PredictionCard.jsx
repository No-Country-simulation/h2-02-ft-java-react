export function PredictionCard({
  league,
  result,
  team1,
  team2,
  points,
  status,
}) {
  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow">
      <div className="flex items-center">
        {/* Liga y logo */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <img src={`/${league}.png`} alt="League Logo" />
        </div>
        <div className="ml-4">
          <span className="text-sm text-gray-500">{league}</span>
          <p className="text-lg font-semibold">{result}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            {team1} vs {team2}
          </p>
          <p
            className={`text-sm ${status === 'pendiente' ? 'text-yellow-500' : status === 'ganado' ? 'text-green-500' : 'text-red-500'}`}
          >
            {status === 'pendiente'
              ? 'Pendiente'
              : status === 'ganado'
                ? `Ganaste ${points} puntos`
                : 'No ganaste puntos'}
          </p>
        </div>
        <div className="text-2xl font-semibold text-blueWaki">{points}</div>
      </div>
    </div>
  );
}
