import { useMatch } from '../../context/MatchContext';
import Searchbar from '../molecules/Searchbar';
import SelectMatchTabs from './SelectMatchTabs';
import { BodySelectPredictionsCard } from '../atoms/BodyPredictionsCard';

export default function Step4SelectMatch({ setStep }) {
  const { selectedMatch, selectMatch } = useMatch();

  const handleSelectMatch = (match) => {
    setStep(1);
    selectMatch(match); // En realidad acá iría el partido seleccionado de la lista
  };

  return (
    <section className="flex h-full flex-col divide-y overflow-y-auto">
      <div className="flex flex-col pb-5">
        <h2 className="text-center text-semibold-22 font-semibold text-label">
          ¿Con qué vas a combinar?
        </h2>
        <p className="px-5 text-center text-medium-18 font-medium text-grayWaki">
          Elige un partido dentro de los próximos 5 días
        </p>
      </div>
      <div className="flex flex-col pt-5">
        <SelectMatchTabs />
        <Searchbar />
        {/* Lista de partidos, se podría hacer dinámica */}
        <button
          className="mx-5 flex flex-col items-center divide-y overflow-hidden rounded-large bg-white text-center text-regular-12 text-grayWaki shadow-custom"
          onClick={() => handleSelectMatch(selectedMatch)}
        >
          <p className="p-1 text-regular-12 text-label">10:00hs</p>
          <BodySelectPredictionsCard
            team1={selectedMatch.localTeam}
            team2={selectedMatch.visitorTeam}
          />
        </button>
      </div>
    </section>
  );
}
