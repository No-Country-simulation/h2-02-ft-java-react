export default function PredictionsNavbar({
  underlinePosition,
  setUnderlinePosition,
}) {
  return (
    <>
      <nav className="grid grid-cols-3 text-center">
        <button
          onClick={() => setUnderlinePosition('left')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'left'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Predicciones
        </button>
        <button
          onClick={() => setUnderlinePosition('center')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'center'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Detalles
        </button>
        <button
          onClick={() => setUnderlinePosition('right')}
          className={`px-4 py-2 text-regularNav-16 transition-colors duration-300 ${
            underlinePosition === 'right'
              ? 'font-medium text-blueWaki'
              : 'text-grayWaki'
          }`}
        >
          Clasificación
        </button>
      </nav>
      <span
        className={`absolute bottom-0 h-[3px] w-1/3 transform bg-blueWaki transition-all duration-500 ease-in-out ${
          underlinePosition === 'left'
            ? 'translate-x-0'
            : underlinePosition === 'center'
              ? 'translate-x-full'
              : 'translate-x-[200%]'
        }`}
      ></span>
    </>
  );
}
