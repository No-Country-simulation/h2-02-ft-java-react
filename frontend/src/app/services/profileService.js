import axios from 'axios';

const API_URL = '/api';

// Obtener el perfil por ID de perfil
export const getProfile = async (profileId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el perfil');
  }
};

// Validar predicción por ID de perfil
export const validatePrediction = async (profileId, predictions) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/profile/validatePrediction/${profileId}`,
      predictions,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al validar la predicción');
  }
};

// Obtener predicciones por fecha e ID de perfil
export const getPredictionByDate = async (profileId, date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/profile/predictionByDate/${profileId}`,
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
    throw new Error('Error al obtener las predicciones por fecha');
  }
};
