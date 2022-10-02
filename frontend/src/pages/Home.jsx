import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ marginBlock: '30px' }}>
        <Outlet />
      </Container>
    </>
  );
};
export default Home;
