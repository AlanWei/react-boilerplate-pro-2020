import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const PAGE_PREFIX = 'login';

export const loginUser = createAsyncThunk(
  `${PAGE_PREFIX}/loginUser`,
  async (userData) => {
    const response = await api.post('/login', userData);
    return response;
  },
);

export const loginSlice = createSlice({
  name: PAGE_PREFIX,
  initialState: {
    status: 'idle',
    user: {},
    error: '',
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectError = (state) => state[PAGE_PREFIX].error;
export const selectUser = (state) => state[PAGE_PREFIX].user;

export default loginSlice.reducer;
