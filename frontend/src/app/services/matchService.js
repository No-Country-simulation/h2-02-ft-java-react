import axios from 'axios';

const API_URL = '/api';

// Obtener los partidos por fecha
export const getMatchesDate = async (date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/fixture/getFixtureDate?date=${date}`,
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
    throw new Error('Error al obtener los partidos de una fecha determinada');
  }
};

// Obtener los partidos de hoy por código de competencia y fecha
export const getMatchesLeagueDate = async (competitionCode, date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/fixture/getFixtureCodeDate?leagueId=${competitionCode}&date=${date}`,
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
    throw new Error(
      'Error al obtener los partidos de una liga y fecha determinadas'
    );
  }
};

// Obtener todas las competiciones
export const getCompetitions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/league/allLeagues`, {
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
    throw new Error('Error al obtener las competiciones');
  }
};

// Obtener las posiciones de una competición
export const getStanding = async (competitionCode) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/standing/${competitionCode}`, {
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
    throw new Error('Error al obtener las posiciones de la competencia');
  }
};
