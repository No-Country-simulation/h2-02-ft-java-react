import { useMatch } from '../../context/MatchContext';

export default function PredictionsPronostico() {
  const { selectedMatch } = useMatch();

  return (
    <section className="flex w-full flex-col gap-3">
      <h3 className="text-regularNav-16 font-medium text-label">
        Pronóstico general
      </h3>
      <div className="flex flex-col overflow-hidden rounded-large bg-white text-regular-12 text-grayWaki shadow-custom">
        <header className="px-4 py-2">Resultado final</header>
        <div className="grid w-full grid-cols-3 items-center justify-center gap-2 bg-grayCard p-5">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Local</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">
              {selectedMatch.odds.localWin}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Empate</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">
              {selectedMatch.odds.draw}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Visitante</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">
              {selectedMatch.odds.visitorWin}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
