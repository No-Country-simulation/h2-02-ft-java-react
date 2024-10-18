import axios from 'axios';

const API_URL = '/api';

// Función para obtener los partidos por código de competencia
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

// Función para obtener los partidos de hoy por código de competencia y fecha
export const getMatchesToday = async (competitionCode, date) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_URL}/match/getMatchesToday?code=${competitionCode}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los partidos de hoy');
  }
};
