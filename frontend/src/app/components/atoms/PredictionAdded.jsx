import AddedCheck from '../../../assets/AddedCheck.png';

export default function PredictionAdded() {
  return (
    <div className="flex w-72 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-[0_0_10px_5px_rgba(0,0,0,0.5)]">
      <img width={57} height={57} src={AddedCheck} alt="Added Check" />
      <p className="mt-4 text-center text-medium-18 font-medium text-label">
        Se ha añadido tu predicción
      </p>
    </div>
  );
}
