import { PredictionCard } from '../molecules/PredictionCard';

export default function PredictionSection({ title, predictions }) {
  return (
    <div className="rounded-t-large bg-white p-5">
      <h3 className="px-4 font-semibold text-blueWaki">{title}</h3>
      <div className="mt-2">
        {predictions.map((prediction, index) => (
          <PredictionCard key={index} {...prediction} />
        ))}
      </div>
    </div>
  );
}
