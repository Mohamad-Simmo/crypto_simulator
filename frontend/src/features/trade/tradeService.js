import axios from 'axios';

const BASE_URL = 'api/trades/';

const getBuys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(BASE_URL, config);

  return data;
};

const buyCoin = async (token, buyData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(BASE_URL + 'buy', buyData, config);

  return data;
};

export const sellCoins = async (token, sellData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(BASE_URL + 'sell', sellData, config);
  console.log(data);
  return data;
};

const tradeService = {
  getBuys,
  buyCoin,
  sellCoins,
};

export default tradeService;
