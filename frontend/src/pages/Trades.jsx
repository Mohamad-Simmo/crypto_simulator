import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBuys } from '../features/trade/tradeSlice';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableCell,
  TableBody,
  TableRow,
  Avatar,
  Typography,
  Button,
  Box,
  Modal,
} from '@mui/material';
import { sellCoins } from '../features/trade/tradeSlice';
import { updateBalance } from '../features/auth/authSlice';

const Trades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState('');
  const [coinName, setCoinName] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { buys, isLoading, isError, message } = useSelector(
    (state) => state.trade
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getBuys());
  }, [user, dispatch, navigate, isError, message]);

  const formatter = Intl.NumberFormat('en', {
    currency: 'usd',
    style: 'currency',
    maximumSignificantDigits: 3,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (coinId, sellPrice, coinName, coinAmount) => {
    setOpen(true);
    setCoinId(coinId);
    setSellPrice(sellPrice);
    setCoinName(coinName);
    setAmount(coinAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      sellCoins({
        coinId,
        sellPrice,
      })
    );
    dispatch(updateBalance());
    setOpen(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Typography>
            Sell {amount} {coinName} For {formatter.format(sellPrice)}
          </Typography>
          <Button variant="contained" type="submit">
            Confirm
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Sell Price</TableCell>
              <TableCell>Profit / Loss</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buys.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Avatar src={item.image} />
                  <Typography>{item.name}</Typography>
                </TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{formatter.format(item.buyPrice)}</TableCell>
                <TableCell>
                  {formatter.format(item.current_price * item.amount)}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      item.current_price * item.amount - item.buyPrice < 0
                        ? 'red'
                        : 'green',
                  }}
                >
                  {formatter.format(
                    item.current_price * item.amount - item.buyPrice
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleOpen(
                        item.coinId,
                        item.current_price * item.amount,
                        item.name,
                        item.amount
                      )
                    }
                  >
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Trades;
