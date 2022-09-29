import axios from 'axios';

const BASE_URL = '/api/users';

const register = async (userData) => {
  const { data } = await axios.post(BASE_URL + '/', userData);

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

const login = async (userData) => {
  const { data } = await axios.post(BASE_URL + '/login', userData);

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };

export default authService;
