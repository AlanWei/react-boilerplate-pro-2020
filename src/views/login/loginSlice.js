import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import isNil from 'lodash/isNil';
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
    isLogin: !isNil(Cookie.get('user')),
    error: '',
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      const user = action.payload;
      state.status = 'succeeded';
      state.user = user;
      state.isLogin = true;
      Cookie.set('user', JSON.stringify(user));
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectError = (state) => state[PAGE_PREFIX].error;
export const selectUser = (state) => state[PAGE_PREFIX].user;
export const selectIsLogin = (state) => state[PAGE_PREFIX].isLogin;

export default loginSlice.reducer;
