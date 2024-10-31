import { useEffect, useState } from 'react';
import { usePredictions } from '../../context/PredictionsContext';
import { useDate } from '../../context/DateContext';
import { useAuth } from '../../context/AuthContext';
import { fetchProfileAndCheckPredictions } from '../../utils/profileUtils';
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
  const { allPredictions, fetchAllPredictions } = usePredictions();
  const { selectedDate, updateSelectedDate } = useDate();
  const { userId } = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    updateSelectedDate('Todas');
  }, []);
  console.log('allPredictions', allPredictions);

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

  useEffect(() => {
    if (shouldFetch) {
      fetchAllPredictions();
    }
  }, [shouldFetch]);

  return (
    <div className="mb-[90px] min-h-[calc(100vh-460px)] rounded-t-large bg-white p-5">
      {!shouldFetch ? (
        <NoPredictions />
      ) : (
        <>
          <ActivePredictions />
          <ListActivePredictions activePredictions={myPredictions} />
          {pastPredictions.length > 0 && (
            <ListPastPredictions pastPredictions={pastPredictions} />
          )}
        </>
      )}
    </div>
  );
}
