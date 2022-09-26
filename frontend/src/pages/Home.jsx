import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Home;
