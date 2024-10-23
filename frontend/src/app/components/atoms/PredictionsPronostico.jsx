export default function PredictionsPronostico() {
  return (
    <section className="flex w-full flex-col gap-3">
      <h3 className="text-regularNav-16 font-medium text-label">
        Pronóstico general
      </h3>
      <div className="flex flex-col overflow-hidden rounded-large bg-white text-regular-12 text-grayWaki shadow-custom">
        <header className="px-4 py-2">Resultado final</header>
        <div className="grid w-full grid-cols-3 items-center justify-center gap-2 bg-grayCard p-5">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Osasuna</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">48%</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Empate</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">12%</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12.42px] leading-[18.63px]">Barcelona</p>
            <p className="text-semibold-22 font-semibold text-blueWaki">40%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
