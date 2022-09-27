import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Paper,
  TableBody,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const CoinsContainer = ({ coins, page }) => {
  const navigate = useNavigate();
  const formatterCompact = Intl.NumberFormat('en', {
    notation: 'compact',
    currency: 'usd',
    style: 'currency',
  });
  const formatter = Intl.NumberFormat('en', {
    currency: 'usd',
    style: 'currency',
    maximumSignificantDigits: 6,
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>24h</TableCell>
            <TableCell>Mkt Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin, idx) => {
            return (
              <TableRow key={coin.id}>
                <TableCell component="th" scope="row">
                  {(page - 1) * 20 + idx + 1}
                </TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',

                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                  onClick={() => {
                    navigate(`/${coin.id}`);
                  }}
                >
                  <Avatar src={coin.image} />
                  {coin.name} <span className="coin-symbol">{coin.symbol}</span>
                </TableCell>
                <TableCell>
                  {formatter.format(coin.current_price) || '-'}
                </TableCell>
                <TableCell>
                  {formatterCompact.format(coin.total_volume) || '-'}
                </TableCell>
                <TableCell
                  sx={{ color: coin.price_change_24h > 0 ? 'green' : 'red' }}
                >
                  {formatter.format(coin.price_change_24h) || '-'}
                </TableCell>
                <TableCell>
                  {formatterCompact.format(coin.market_cap) || '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CoinsContainer;
