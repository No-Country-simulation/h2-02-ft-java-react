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
