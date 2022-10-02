import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tradeReducer from '../features/trade/tradeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trade: tradeReducer,
  },
});
