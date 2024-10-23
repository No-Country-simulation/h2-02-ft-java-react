export default function Step3CombinedPrediction({
  handleNextStep,
  handlePrediction,
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-lg font-bold">
        ¿Con qué vas a combinar?
      </h2>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => handlePrediction('Goles')}
      >
        Goles
      </button>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleNextStep}
      >
        Otro partido
      </button>
    </div>
  );
}
