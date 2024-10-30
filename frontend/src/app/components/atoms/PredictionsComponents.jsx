import AnchorButton from './AnchorButton';

export function NoPredictions() {
  return (
    <div className="mb-5 flex flex-col items-center gap-5">
      <h3 className="text-medium-18 font-medium text-blueWaki">
        Aún no has hecho predicciones
      </h3>
      <AnchorButton to="/match">Hacer predicción</AnchorButton>
    </div>
  );
}

export function ActivePredictions() {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-medium-18 font-medium text-blueWaki">Activas</h3>
        <AnchorButton to="/match">Hacer predicción</AnchorButton>
      </div>
      <ul className="mb-2 grid grid-cols-[1fr_1fr_50px] items-center rounded-large px-4 py-2 shadow-custom">
        <li className="text-regular-12 text-grayLightWaki">Predicción</li>
        <li className="text-regular-12 text-grayLightWaki">Partido</li>
        <li className="text-center text-regular-12 text-grayLightWaki">
          Puntos
        </li>
      </ul>
    </>
  );
}
