import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCoins = async (page) => {
  try {
    const { data } = await axios.get(
      BASE_URL +
        '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=' +
        page
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoin = async (id) => {
  try {
    const { data } = await axios.get(
      BASE_URL +
        `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoinChart = async (id, days) => {
  try {
    const { data } = await axios.get(
      BASE_URL +
        `/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchCoin = async (keyword) => {
  try {
    const { data } = await axios.get(BASE_URL + '/search?query=' + keyword);
    return data;
  } catch (error) {
    console.log(error);
  }
};
