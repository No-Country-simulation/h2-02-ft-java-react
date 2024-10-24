import { useContext } from 'react';
import { MatchContext } from '../../context/MatchContext';
import Button from '../atoms/Button';
import PredictionsSummary from '../atoms/PredictionsSummary';

const calculatePoints = (selectedOption, matchPredictions) => {
  return selectedOption === 'LOCAL'
    ? matchPredictions.localWin
    : selectedOption === 'DRAW'
      ? matchPredictions.draw
      : matchPredictions.visitorWin;
};

export default function Step2MatchResult({
  selectedOption,
  setSelectedOption,
  handleSubmitPrediction,
  handleMakeCombinedPrediction,
  setPredictions,
  predictions,
}) {
  const { selectedMatch } = useContext(MatchContext);

  const {
    id,
    localTeam,
    visitorTeam,
    startTime,
    predictions: matchPredictions,
  } = selectedMatch;

  const points = calculatePoints(selectedOption, matchPredictions);

  // Función para agregar la predicción al array
  const addPrediction = () => {
    setPredictions([
      ...predictions,
      {
        matchId: id,
        expectedResult: selectedOption,
        homeTeam: localTeam.name,
        awayTeam: visitorTeam.name,
        matchDay: startTime,
        pay: points,
        competitionCode: 'CLI',
      },
    ]);
  };

  return (
    <section className="flex h-full flex-col divide-y overflow-y-auto">
      <div className="flex flex-col pb-5">
        <h2 className="text-center text-semibold-22 font-semibold text-label">
          Predice el resultado
        </h2>
        <p className="text-center text-medium-18 font-medium text-grayWaki">
          Selecciona una opción
        </p>
      </div>

      {/* Elección de resultado */}
      <div className="flex h-full max-h-[calc(100%-110px)] flex-col justify-between gap-4 px-5 py-7">
        <div className="grid shrink grid-cols-2 grid-rows-[1fr_auto] gap-4 hover:shrink-0">
          {/* Local */}
          <button
            className={`flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${selectedOption === 'LOCAL' ? 'border-blueWaki' : 'border-transparent'}`}
            onClick={() => setSelectedOption('LOCAL')}
          >
            <figure className="h-12">
              <img
                src={localTeam.logoUrl}
                alt={`${localTeam.name} Logo`}
                className="h-full w-full object-contain"
              />
            </figure>
            <p className="text-balance text-medium-18 font-medium text-label">
              {localTeam.name.replace(' FC', '')}
            </p>
            <p className="text-balance text-center text-regular-12 text-grayLightWaki">
              {matchPredictions.localWin}
            </p>
          </button>

          {/* Empate */}
          <button
            className={`order-last col-span-2 flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 text-medium-18 font-medium text-label shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${selectedOption === 'DRAW' ? 'border-blueWaki' : 'border-transparent'}`}
            onClick={() => setSelectedOption('DRAW')}
          >
            Empate
            <p className="text-balance text-center text-regular-12 font-normal text-grayLightWaki">
              {matchPredictions.draw}
            </p>
          </button>

          {/* Visitante */}
          <button
            className={`flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${selectedOption === 'AWAY' ? 'border-blueWaki' : 'border-transparent'}`}
            onClick={() => setSelectedOption('AWAY')}
          >
            <figure className="h-12">
              <img
                src={visitorTeam.logoUrl}
                alt={`${visitorTeam.name} Logo`}
                className="h-full w-full object-contain"
              />
            </figure>
            <p className="text-balance text-medium-18 font-medium text-label">
              {visitorTeam.name.replace(' FC', '')}
            </p>
            <p className="text-balance text-center text-regular-12 text-grayLightWaki">
              {matchPredictions.visitorWin}
            </p>
          </button>
        </div>

        {/* Enviar resultados */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            className="w-full"
            onClick={() => {
              addPrediction();
              handleSubmitPrediction();
            }}
            disabled={selectedOption === 'Resultado'}
          >
            Predecir
          </Button>
          <Button
            variant="outline"
            size="large"
            className="w-full"
            onClick={() => {
              addPrediction();
              handleMakeCombinedPrediction();
            }}
            disabled={selectedOption === 'Resultado'}
          >
            Hacer combinada
          </Button>
        </div>
      </div>

      {selectedOption !== 'Resultado' && (
        <PredictionsSummary
          selected={selectedOption}
          team1={localTeam}
          team2={visitorTeam}
          points={points}
          status={'pending'}
        />
      )}
    </section>
  );
}
