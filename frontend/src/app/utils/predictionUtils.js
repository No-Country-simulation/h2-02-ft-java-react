// Función para calcular los puntos de una predicción según la opción seleccionada
export const calculatePoints = (selectedOption, matchPredictions) => {
  return selectedOption === 'LOCAL'
    ? matchPredictions.localWin
    : selectedOption === 'DRAW'
      ? matchPredictions.draw
      : matchPredictions.visitorWin;
};
// Devuelve el name o Empate dependiendo la elección del usuario
export const getTeamName = (selectedOption, localTeam, visitorTeam) => {
  return selectedOption === 'LOCAL'
    ? localTeam.name
    : selectedOption === 'AWAY'
      ? visitorTeam.name
      : 'Empate';
};
