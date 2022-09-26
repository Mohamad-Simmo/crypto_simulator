import { TextField, Box, Stack, Button } from '@mui/material';

const Login = () => {
  return (
    <Box component="form">
      <Stack
        margin="50px auto"
        spacing={2}
        sx={{
          maxWidth: {
            sm: '50%',
            xs: '90%',
          },
        }}
      >
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button variant="contained">Login</Button>
      </Stack>
    </Box>
  );
};
export default Login;
