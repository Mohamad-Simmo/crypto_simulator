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

const CoinsContainer = ({ coins, page }) => {
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
                    backgroundColor: 'pink',
                    '&:hover': {
                      backgroundColor: 'blue',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => console.log(coin.id)}
                >
                  <Avatar src={coin.image} />
                  {coin.name} <span className="coin-symbol">{coin.symbol}</span>
                </TableCell>
                <TableCell>$ {coin.current_price || '-'}</TableCell>
                <TableCell>$ {coin.total_volume || '-'}</TableCell>
                <TableCell>{coin.price_change_24h || '-'}</TableCell>
                <TableCell>$ {coin.market_cap || '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CoinsContainer;
