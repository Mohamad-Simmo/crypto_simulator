import { useParams } from 'react-router-dom';
import { getCoin, getCoinChart } from '../utils/fetchFromApi';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import CoinChart from '../components/CoinChart';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { buyCoin } from '../features/trade/tradeSlice';
import { updateBalance } from '../features/auth/authSlice';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { isLoading } = useSelector((state) => state.trade);
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setAmount('');
  };
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Prices',
        data: [],
      },
    ],
  });

  const formatter = Intl.NumberFormat('en', {
    currency: 'usd',
    style: 'currency',
    maximumSignificantDigits: 3,
  });

  useEffect(() => {
    getCoin(id)
      .then((data) => setCoin(data))
      .then(() => setIsPageLoading(false));
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

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    setBuyPrice(e.target.value * coin?.market_data?.current_price?.usd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      buyCoin({
        coinId: coin.id,
        amount: amount,
        buyPrice: buyPrice,
      })
    );
    dispatch(updateBalance());
    setBuyPrice(0);
    setOpenModal(false);
  };

  if (isPageLoading) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <Container maxWidth="md" sx={{ marginBlock: '30px' }}>
      <Box>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Avatar
            src={coin.image?.large}
            sx={{ height: '100px', width: '100px' }}
          />
          <Stack spacing={1}>
            <Typography variant="h4">{coin.name}</Typography>
            <Typography variant="subtitle">({coin.symbol})</Typography>
          </Stack>
          <Button variant="contained" onClick={handleOpen}>
            Buy
          </Button>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Buy {coin.symbol}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={amount}
                  onChange={handleChangeAmount}
                />
                <br />
                <Button type="submit">Submit</Button>
                <Typography>Price: {formatter.format(buyPrice)}</Typography>
              </form>
            </Box>
          </Modal>
        </Stack>
      </Box>
      <Stack
        sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}
      >
        <Box sx={{ flex: 3, maxWidth: '100%' }}>
          {chartData && <CoinChart chartData={chartData} />}
        </Box>
        <Box sx={{ flex: 1 }} p={2}>
          <Typography>
            Current Price:{' '}
            {formatter.format(coin?.market_data?.current_price?.usd)}
          </Typography>
          <Typography mt={2}>
            24h change:{' '}
            {formatter.format(coin?.market_data?.price_change_percentage_24h)}
          </Typography>
          <Typography mt={2}>
            24h high: {formatter.format(coin?.market_data?.high_24h?.usd)}
          </Typography>
          <Typography mt={2}>
            24h low: {formatter.format(coin?.market_data?.low_24h?.usd)}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
export default Coin;
