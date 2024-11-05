import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { usePredictions } from '../../context/PredictionsContext';
import { validatePrediction } from '../../services/profileService';
import { getPoints } from '../../utils/predictionUtils';
import { formatDate } from '../../utils/dateUtils';
import Button from '../atoms/Button';
import PredictionsSummary from '../atoms/PredictionsSummary';

export default function Step2MatchResult({ handleSubmitPrediction }) {
  const {
    selectedOption,
    setSelectedOption,
    handleNextStep,
    startNewJourney,
    selectedPredictionMatch,
  } = useModal();
  const { userId } = useAuth();
  const { predictions, fetchAllPredictions } = usePredictions();

  const {
    id,
    localTeam,
    visitorTeam,
    startTime,
    odds: matchPredictions,
    league,
  } = selectedPredictionMatch;

  const points = getPoints(selectedOption, matchPredictions);

  // Maneja el inicio de la predicción combinada
  const handleMakeCombinedPrediction = () => {
    handleNextStep(3);
  };

  // Maneja la adición de una predicción única
  const handleAddOnePrediction = async () => {
    const newPrediction = [
      {
        matchId: `${id}`,
        expectedResult: selectedOption,
        homeTeam: localTeam.name,
        awayTeam: visitorTeam.name,
        matchDay: formatDate(startTime),
        homeShield: localTeam.logoUrl,
        awayShield: visitorTeam.logoUrl,
        pay: parseFloat(points),
        competition: league.name,
        competitionShield: league.logo,
      },
    ];

    if (predictions.length > 0) {
      const matchesPredictions = predictions.map(
        (prediction) => prediction.match
      );
      newPrediction.push(...matchesPredictions);
    }

    try {
      // Llamada a validatePrediction y espera su finalización
      await validatePrediction(userId, newPrediction);
      // Llamar a fetchAllPredictions si validatePrediction fue exitosa
      await fetchAllPredictions();
      console.log('Predicción validada con éxito');
    } catch (error) {
      console.error('Error al validar la predicción:', error);
    }
  };

  // Maneja la predicción combinada
  const handleAddPrediction = () => {
    startNewJourney({
      matchId: `${id}`,
      expectedResult: selectedOption,
      homeTeam: localTeam.name,
      awayTeam: visitorTeam.name,
      matchDay: formatDate(startTime),
      homeShield: localTeam.logoUrl,
      awayShield: visitorTeam.logoUrl,
      pay: parseFloat(points),
      competition: league.name,
      competitionShield: league.logo,
    });
    handleMakeCombinedPrediction();
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

      {/* Opciones de predicción */}
      <div className="flex h-full max-h-[calc(100%-130px)] flex-col justify-between gap-4 px-10 py-7">
        <div className="grid shrink grid-cols-2 grid-rows-[1fr_auto] gap-4 hover:shrink-0">
          {/* Local */}
          <button
            className={`flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${
              selectedOption === 'LOCAL'
                ? 'border-blueWaki'
                : 'border-transparent'
            }`}
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
              {localTeam.name}
            </p>
            <p className="text-balance text-center text-regular-12 text-grayLightWaki">
              {matchPredictions.localWin}
            </p>
          </button>

          {/* Empate */}
          <button
            className={`order-last col-span-2 flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 text-medium-18 font-medium text-label shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${
              selectedOption === 'DRAW'
                ? 'border-blueWaki'
                : 'border-transparent'
            }`}
            onClick={() => setSelectedOption('DRAW')}
          >
            Empate
            <p className="text-balance text-center text-regular-12 font-normal text-grayLightWaki">
              {matchPredictions.draw}
            </p>
          </button>

          {/* Visitante */}
          <button
            className={`flex flex-col items-center justify-between gap-2 rounded-large border-2 bg-white p-2 shadow-[0_0_9.2px_0_rgba(0,0,0,0.25)] transition-all duration-300 ${
              selectedOption === 'AWAY'
                ? 'border-blueWaki'
                : 'border-transparent'
            }`}
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
              {visitorTeam.name}
            </p>
            <p className="text-balance text-center text-regular-12 text-grayLightWaki">
              {matchPredictions.visitorWin}
            </p>
          </button>
        </div>

        {/* Botones de acción */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            className="w-full"
            onClick={() => {
              handleAddOnePrediction();
              handleSubmitPrediction();
            }}
            disabled={
              selectedOption === 'RESULTADO_FINAL' || selectedOption === 'GOLES'
            }
          >
            Predecir
          </Button>
          <Button
            variant="outline"
            size="large"
            className="w-full"
            onClick={handleAddPrediction}
            disabled={
              selectedOption === 'RESULTADO_FINAL' || selectedOption === 'GOLES'
            }
          >
            Hacer combinada
          </Button>
        </div>
      </div>

      {selectedOption !== 'RESULTADO_FINAL' && selectedOption !== 'GOLES' && (
        <PredictionsSummary
          selected={selectedOption}
          homeTeam={localTeam}
          awayTeam={visitorTeam}
          points={points}
          status="PENDING"
        />
      )}
    </section>
  );
}
