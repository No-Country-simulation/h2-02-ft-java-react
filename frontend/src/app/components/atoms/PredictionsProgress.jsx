import clsx from 'clsx';

export default function PredictionsProgress({
  usedPredictions,
  totalPredictions = 5,
}) {
  const circles = [];

  for (let i = 0; i < totalPredictions; i++) {
    circles.push(
      <span
        key={i}
        className={clsx(
          'h-3 w-3 rounded-full border-[1.11px] border-purpleWaki',
          i < usedPredictions ? 'bg-purpleWaki' : 'bg-transparent'
        )}
      />
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 flex h-14 items-center justify-between rounded-t-xl bg-white px-10 py-4 shadow-[0_0_11.8px_0_rgba(0,0,0,0.2)]">
      <p className="text-regular-14 font-medium text-purpleWaki">
        Predicciones utilizadas de hoy:
      </p>
      <div className="flex space-x-1">{circles}</div>
    </div>
  );
}
