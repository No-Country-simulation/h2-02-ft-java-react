import axios from 'axios';

const API_URL = '/api';

// Obtener todas las predicciones por ID de perfil
export const getPredictions = async (profileId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/prediction/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error al obtener las predicciones');
  }
};

// Obtener predicciones por fecha y por ID de perfil
export const getPredictionByDate = async (profileId, date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/prediction/byDate/${profileId}?matchDay=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error al obtener las predicciones por fecha');
  }
};

// Obtener predicciones por ID de partido y por ID de perfil
export const getPredictionByMatchId = async (profileId, matchId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/prediction/byMatchId/${profileId}?matchId=${matchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error al obtener las predicciones por matchId');
  }
};

// Obtenemos un booleano true o false dependiendo si existe la predicción de un matchId
export const getPredictionExistenceByMatchId = async (profileId, matchId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/prediction/existence/${profileId}?matchId=${matchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error al obtener las predicciones por matchId');
  }
};
