// Función para calcular los puntos de una predicción según la opción seleccionada
export const getPoints = (selectedOption, matchPredictions) => {
  const optionsMap = {
    LOCAL: matchPredictions?.localWin,
    DRAW: matchPredictions?.draw,
    AWAY: matchPredictions?.visitorWin,
  };
  return optionsMap[selectedOption] || 0;
};

// Devuelve el name o Empate dependiendo la elección del usuario
export const getTeamName = (selectedOption, localTeam, visitorTeam) => {
  return selectedOption === 'LOCAL'
    ? localTeam.name
    : selectedOption === 'AWAY'
      ? visitorTeam.name
      : 'Empate';
};
