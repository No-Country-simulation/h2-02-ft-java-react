import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePredictions } from '../../context/PredictionsContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/dateUtils';
import { getRemainingPredictionByDate } from '../../services/profileService';

export default function PredictionsProgress({
  totalPredictions = 5,
  date = formatDate(new Date()),
  cantCircles,
}) {
  const { remainingPredictions, fetchRemainingPredictions } = usePredictions();
  const { userId } = useAuth();
  const [remainingPredictionsForTwo, setRemainingPredictionsForTwo] = useState(
    totalPredictions === 2 ? 0 : null // Solo se utiliza cuando totalPredictions es 2
  );

  useEffect(() => {
    if (totalPredictions === 5) {
      fetchRemainingPredictions(date);
    } else if (totalPredictions === 2) {
      // Fetch adicional solo para totalPredictions de 2
      const fetchForTwo = async () => {
        const { remainingPredictions } = await getRemainingPredictionByDate(
          userId,
          date
        );
        setRemainingPredictionsForTwo(remainingPredictions);
      };
      fetchForTwo();
    }
  }, [fetchRemainingPredictions, date, totalPredictions]);

  const usedPredictions =
    totalPredictions === 5
      ? 5 - remainingPredictions
      : 5 - remainingPredictionsForTwo;

  const circles = [];

  for (let i = 0; i < cantCircles; i++) {
    circles.push(
      <span
        key={i}
        className={clsx(
          'rounded-full border-[1.11px] border-purpleWaki',
          i < usedPredictions ? 'bg-purpleWaki' : 'bg-transparent',
          totalPredictions !== 5 ? 'h-[10px] w-[10px]' : 'h-3 w-3'
        )}
      />
    );
  }

  if (totalPredictions !== 5) {
    return <div className="flex space-x-1">{circles}</div>;
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
