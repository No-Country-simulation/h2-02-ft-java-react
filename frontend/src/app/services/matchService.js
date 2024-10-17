import axios from 'axios';

const API_URL = '/api';

export const getMatches = async (competitionCode) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_URL}/match/getMatches/${competitionCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los partidos');
  }
};
