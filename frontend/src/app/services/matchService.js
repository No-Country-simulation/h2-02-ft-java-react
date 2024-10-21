import axios from 'axios';

const API_URL = '/api';

// Obtener los partidos por código de competencia
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

// Obtener los partidos de hoy por código de competencia y fecha
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

// Obtener competiciones por área geográfica
export const getAreaCompetitions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/match/area-competition`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las competiciones por área');
  }
};
