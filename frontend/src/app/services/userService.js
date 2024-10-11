import axios from 'axios';

const API_URL = '/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
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
    throw new Error('Error al crear el usuario');
  }
};
