import axios from 'axios';

const API_URL = '/api';

// Obtener el perfil de un jugador con estadísticas y trofeos por ID
export const getPlayerProfileWithStatAndTrophies = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/player/playerProfileWithStatAndTrophies/${id}`,
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
      'Error al obtener el perfil del jugador con estadísticas y trofeos'
    );
  }
};

// Obtener el perfil de un jugador con estadísticas por ID
export const getPlayerProfileWithStat = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/player/playerProfileWithStat/${id}`,
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
    throw new Error('Error al obtener el perfil del jugador con estadísticas');
  }
};

// Obtener todos los perfiles de jugadores
export const getAllPlayersProfiles = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/player/allPlayersProfiles`, {
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
    throw new Error('Error al obtener todos los perfiles de jugadores');
  }
};

// Obtener el perfil de un jugador con estadísticas por ID y temporada
export const getPlayerProfileWithStatBySeason = async (id, season) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/player/playerProfileWithStat/${id}/${season}`,
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
      'Error al obtener el perfil del jugador con estadísticas por temporada'
    );
  }
};

// Obtener los trofeos de un jugador por ID
export const getPlayerTrophies = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/trophie/playerTrophie/${id}`, {
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
    throw new Error('Error al obtener los trofeos del jugador');
  }
};

// Obtener los trofeos de un jugador por ID y temporada
export const getPlayerTrophiesBySeason = async (id, season) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/trophie/playerTrophie/${id}/${season}`,
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
    throw new Error('Error al obtener los trofeos del jugador por temporada');
  }
};
