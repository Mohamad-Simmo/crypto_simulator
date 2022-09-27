import { useParams } from 'react-router-dom';
import { getCoin, getCoinChart } from '../utils/fetchFromApi';
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack, Avatar } from '@mui/material';
import CoinChart from '../components/CoinChart';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Prices',
        data: [],
      },
    ],
  });

  useEffect(() => {
    getCoin(id).then((data) => setCoin(data));
    getCoinChart(id, 6).then((data) => {
      setChartData({
        labels: data.prices.map((arr) => {
          const date = new Date(arr[0]);
          return `${date.getDate()} ${date.toLocaleString('default', {
            month: 'short',
          })}`;
        }),
        datasets: [
          {
            label: 'Prices',
            data: data.prices.map((arr) => arr[1]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ marginBlock: '30px' }}>
      <Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            src={coin.image?.large}
            sx={{ height: '100px', width: '100px' }}
          />
          <Stack spacing={1}>
            <Typography variant="h4">{coin.name}</Typography>
            <Typography variant="subtitle">({coin.symbol})</Typography>
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row">
        <Box sx={{ flex: 3 }}>
          {chartData && <CoinChart chartData={chartData} />}
        </Box>
        <Box bgcolor="pink" sx={{ flex: 1 }}></Box>
      </Stack>
    </Container>
  );
};
export default Coin;
