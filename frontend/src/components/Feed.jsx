import { Container, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCoins } from '../utils/fetchFromApi';
import Spinner from './Spinner';
import CoinsContainer from './CoinsContainer';
import Search from './Search';

const Feed = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getCoinData = () => {
    getCoins(page)
      .then((data) => setCoins(data))
      .then(() => setIsLoading(false));
  };

  function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
  }

  useEffect(() => {
    const interval = setIntervalImmediately(getCoinData, 60000);
    window.scrollTo(0, 0);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  if (isLoading) return <Spinner />;

  return (
    <Container maxWidth="md" sx={{ marginBlock: '30px' }}>
      <CoinsContainer coins={coins} page={page} />
      <Pagination
        page={page}
        count={647}
        color="primary"
        onChange={(e, page) => setPage(page)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBlock: '15px',
        }}
      />
    </Container>
  );
};
export default Feed;
