import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradeService from './tradeService';
import { getCoin } from '../../utils/fetchFromApi';

const initialState = {
  buys: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getBuys = createAsyncThunk('trade/buys', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const data = await tradeService.getBuys(token);
    let newData = await Promise.all(
      data.map(async (item) => {
        const coinData = await getCoin(item.coinId);
        return {
          ...item,
          name: coinData.name,
          symbol: coinData.symbol,
          image: coinData.image.small,
          current_price: coinData.market_data.current_price.usd,
        };
      })
    );
    console.log(newData);
    return newData;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const buyCoin = createAsyncThunk(
  'trade/buy',
  async (buyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tradeService.buyCoin(token, buyData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sellCoins = createAsyncThunk(
  'trade/sell',
  async (sellData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tradeService.sellCoins(token, sellData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tradeSlice = createSlice({
  name: 'trade',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBuys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buys = action.payload;
      })
      .addCase(getBuys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(buyCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(buyCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sellCoins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buys = state.buys.filter(
          (item) => item.coinId !== action.payload.coinId
        );
      })
      .addCase(sellCoins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tradeSlice.actions;
export default tradeSlice.reducer;
