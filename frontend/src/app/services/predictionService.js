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

// Obtener predicciones por fecha e ID de perfil
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
