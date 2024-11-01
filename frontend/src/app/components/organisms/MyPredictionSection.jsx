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
  const { allPredictions } = usePredictions();
  const { selectedDate, updateSelectedDate } = useDate();
  const { userId } = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    updateSelectedDate('Todas');
  }, []);

  const datePredictions = usePredictionsByDate(userId, selectedDate);
  const myPredictions =
    selectedDate !== null ? datePredictions : allPredictions;

  useEffect(() => {
    setShouldFetch(myPredictions.length > 0);
  }, [myPredictions]);

  const pastPredictions = myPredictions.filter(
    (prediction) => prediction.status !== 'PENDING'
  );

  useEffect(() => {
    const checkPredictions = async () => {
      const canFetchPredictions = await fetchProfileAndCheckPredictions(userId);
      setShouldFetch(canFetchPredictions);
    };
    checkPredictions();
  }, []);

  return (
    <div className="mb-[90px] min-h-[calc(100vh-460px)] rounded-t-large bg-white p-5">
      {!shouldFetch ? (
        <NoPredictions />
      ) : (
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <ActivePredictions />
          <ListActivePredictions activePredictions={myPredictions} />
          {pastPredictions.length > 0 && (
            <ListPastPredictions pastPredictions={pastPredictions} />
          )}
        </motion.div>
      )}
    </div>
  );
}
