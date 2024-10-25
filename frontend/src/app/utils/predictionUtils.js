// Función para calcular los puntos de una predicción según la opción seleccionada
export const calculatePoints = (selectedOption, matchPredictions) => {
  return selectedOption === 'LOCAL'
    ? matchPredictions.localWin
    : selectedOption === 'DRAW'
      ? matchPredictions.draw
      : matchPredictions.visitorWin;
};
