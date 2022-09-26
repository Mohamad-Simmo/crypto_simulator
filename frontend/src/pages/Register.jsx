import { TextField, Box, Stack, Button } from '@mui/material';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({});
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
        <TextField label="Username" variant="outlined" name="username" />
        <TextField label="Password" variant="outlined" name="password" />
        <TextField
          label="Confirm Password"
          variant="outlined"
          name="passwordConfirm"
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Stack>
    </Box>
  );
};
export default Register;
