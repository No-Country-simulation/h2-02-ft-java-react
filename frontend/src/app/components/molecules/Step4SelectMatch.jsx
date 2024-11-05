import MatchList from '../organisms/MatchList';
import Searchbar from './Searchbar';
import SelectMatchTabs from './SelectMatchTabs';

export default function Step4SelectMatch() {
  return (
    <section className="flex h-full flex-col divide-y overflow-y-auto">
      <div className="flex flex-col px-5 pb-5">
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
        <MatchList isCombined={true} />
      </div>
    </section>
  );
}
