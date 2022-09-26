import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Navbar = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: 'none',
        }}
      >
        <StyledToolbar>
          <Typography
            variant="h3"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <CurrencyBitcoinIcon fontSize="large" />
          </Typography>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Crypto Simulator
          </Typography>

          <Box>
            <Button
              component={Link}
              to="/login"
              sx={{ my: 2, mx: 1, color: 'white' }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ my: 2, mx: 1, color: 'white' }}
            >
              Register
            </Button>
          </Box>
        </StyledToolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
