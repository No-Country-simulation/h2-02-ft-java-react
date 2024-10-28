import axios from 'axios';

const API_URL = '/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    const { token } = response.data;
    return { token };
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error en el login');
  }
};

export const createUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/create`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error detallado:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Error en el registro');
  }
};
