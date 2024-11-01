import { PredictionCard } from './PredictionCard';

export function ListActivePredictions({ activePredictions }) {
  return (
    <div className="flex flex-col gap-2">
      {activePredictions.map((prediction, index) => (
        <PredictionCard key={index} {...prediction} />
      ))}
    </div>
  );
}

export function ListPastPredictions({ pastPredictions }) {
  return (
    <>
      <h3 className="my-5 text-medium-18 font-medium text-blueWaki">Pasadas</h3>
      <div className="flex flex-col gap-2">
        {pastPredictions.map((prediction, index) => (
          <PredictionCard key={index} {...prediction} />
        ))}
      </div>
    </>
  );
}
