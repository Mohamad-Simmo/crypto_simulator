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

const updateBalance = async (token) => {
  console.log('updating');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(BASE_URL + '/me', config);

  return data;
};

const authService = { register, login, logout, updateBalance };

export default authService;
