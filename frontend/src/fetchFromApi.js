import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCoins = async (page) => {
  const { data } = await axios.get(
    BASE_URL +
      '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=' +
      page
  );
  return data;
};

export const searchCoin = async (keyword) => {
  const { data } = await axios.get(BASE_URL + '/search?query=' + keyword);
  return data;
};
