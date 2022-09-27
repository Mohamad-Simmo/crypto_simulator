export const INITIAL_STATE = {
  username: { value: '', touched: false, hasError: true, error: '' },
  password: { value: '', touched: false, hasError: true, error: '' },
  passwordConfirm: { value: '', touched: false, hasError: true, error: '' },
  isFormDisabled: true,
};

export const formActions = {
  CHANGE_INPUT: 'CHANGE_INPUT',
  VALIDATE_INPUT: 'VALIDATE_INPUT',
  ENABLE_FORM: 'ENABLE_FORM',
  PASSWORD_ERR: 'PASSWORD_ERR',
};

export const formReducer = (state, action) => {
  const name = action.payload?.name;
  let value;

  switch (action.type) {
    case formActions.CHANGE_INPUT:
      value = action.payload.value;
      return {
        ...state,
        [name]: {
          ...state[name],
          value,
        },
      };

    case formActions.VALIDATE_INPUT:
      value = state[name].value;
      return {
        ...state,
        [name]: {
          ...state[name],
          hasError: value.trim().length > 0 ? false : true,
          error: value.trim().length > 0 ? '' : `Field cannot be empty`,
          touched: true,
        },
      };

    case formActions.ENABLE_FORM:
      return {
        ...state,
        isFormDisabled: !action.payload,
      };

    case formActions.PASSWORD_ERR:
      return {
        ...state,
        passwordConfirm: {
          ...state.passwordConfirm,
          hasError: true,
          error: 'Passwords must match',
        },
      };

    default:
      return state;
  }
};
