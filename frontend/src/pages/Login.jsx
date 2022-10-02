import { TextField, Box, Stack, Button, Typography } from '@mui/material';
import {
  INITIAL_STATE,
  formReducer,
  formActions,
} from '../reducers/formReducer';
import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';

const Login = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const authDispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (store) => store.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate('/');
    }

    authDispatch(reset());
  }, [user, isSuccess, navigate, authDispatch]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: state.username.value,
      password: state.password.value,
    };

    authDispatch(login(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
        {isError && (
          <Typography variant="p" color="red" p={1}>
            {message}
          </Typography>
        )}
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
