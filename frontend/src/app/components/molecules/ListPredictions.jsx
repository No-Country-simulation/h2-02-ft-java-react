import { PredictionCard } from './PredictionCard';
import { PredictionCarrousel } from './PredictionCarrousel';

export function ListActivePredictions({ activePredictions }) {
  return (
    <div className="flex flex-col gap-2">
      {activePredictions.map((prediction, index) =>
        prediction.match.length > 1 ? (
          <PredictionCarrousel key={index} {...prediction} />
        ) : (
          <PredictionCard key={index} {...prediction} />
        )
      )}
    </div>
  );
}

export function ListPastPredictions({ pastPredictions }) {
  return (
    <>
      <h3 className="my-5 text-medium-18 font-medium text-blueWaki">Pasadas</h3>
      <div className="flex flex-col gap-2">
        {pastPredictions.map((prediction, index) =>
          prediction.match.length > 1 ? (
            <PredictionCarrousel key={index} {...prediction} />
          ) : (
            <PredictionCard key={index} {...prediction} />
          )
        )}
      </div>
    </>
  );
}
