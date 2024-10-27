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
      `${API_URL}/prediction/byDate/${profileId}?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date,
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
    if (error.response && error.response.status === 404) {
      console.warn('Predicción no encontrada para el matchId:', matchId);
      return null; // Devuelve null en lugar de lanzar una excepción
    }
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error al obtener las predicciones por matchId');
  }
};
