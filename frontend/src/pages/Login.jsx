import { TextField, Box, Stack, Button } from '@mui/material';
import {
  INITIAL_STATE,
  formReducer,
  formActions,
} from '../reducers/formReducer';
import { useReducer } from 'react';

const Login = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const changeInput = (name, value) => {
    dispatch({
      type: formActions.CHANGE_INPUT,
      payload: {
        name,
        value,
      },
    });
  };

  const validateInput = (name) => {
    dispatch({
      type: formActions.VALIDATE_INPUT,
      payload: {
        name,
      },
    });
  };

  const validateForm = () => {
    if (state.username.hasError || state.password.hasError) {
      dispatch({ type: formActions.ENABLE_FORM, payload: false });
    } else {
      dispatch({ type: formActions.ENABLE_FORM, payload: true });
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeInput(name, value);
    validateInput(name);
    validateForm();
  };

  const handleInputBlur = (e) => {
    validateInput(e.target.name);
    validateForm();
  };

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
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={state.username.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={state.username.hasError && state.username.touched}
          helperText={state.username.error}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          value={state.password.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={state.password.hasError && state.password.touched}
          helperText={state.password.error}
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={state.isFormDisabled}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};
export default Login;
