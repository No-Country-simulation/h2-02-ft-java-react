// MyPredictionSection.jsx
import { useEffect, useState } from 'react';
import { usePredictions } from '../../context/PredictionsContext';
import { useDate } from '../../context/DateContext';
import { useAuth } from '../../context/AuthContext';
import { fetchProfileAndCheckPredictions } from '../../utils/profileUtils';
import { motion } from 'framer-motion';
import {
  ActivePredictions,
  NoPredictions,
} from '../atoms/PredictionsComponents';
import {
  ListActivePredictions,
  ListPastPredictions,
} from '../molecules/ListPredictions';
import { usePredictionsByDate } from '../../hooks/usePredictionsByDate';

export default function MyPredictionSection() {
  const { selectedDate, updateSelectedDate } = useDate();
  const { allPredictions } = usePredictions();
  const { userId } = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    updateSelectedDate('Todas');
  }, []);

  // Simplificación al trasladar la lógica de remainingPredictions al hook
  const datePredictions = usePredictionsByDate(userId, selectedDate);
  const filteredPredictions = selectedDate ? datePredictions : allPredictions;

  // Define active and past predictions based on status
  const activePredictions = filteredPredictions.filter(
    (prediction) => prediction.status === 'PENDING'
  );
  const pastPredictions = filteredPredictions.filter(
    (prediction) => prediction.status !== 'PENDING'
  );

  useEffect(() => {
    setShouldFetch(filteredPredictions.length > 0);
  }, [filteredPredictions]);

  useEffect(() => {
    const checkPredictions = async () => {
      const canFetchPredictions = await fetchProfileAndCheckPredictions(userId);
      setShouldFetch(canFetchPredictions);
    };
    checkPredictions();
  }, [userId]);

  return (
    <div className="mb-[90px] flex min-h-[308px] items-center justify-center rounded-t-large bg-white p-5">
      <motion.div
        key={selectedDate}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="grow"
      >
        {shouldFetch ? (
          <>
            <ActivePredictions />
            <ListActivePredictions activePredictions={activePredictions} />
            {pastPredictions.length > 0 && (
              <ListPastPredictions pastPredictions={pastPredictions} />
            )}
          </>
        ) : (
          <NoPredictions />
        )}
      </motion.div>
    </div>
  );
}
