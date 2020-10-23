import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { isLogin, getUser, login, logout } from '../../utils/cookie';

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
    user: getUser() || {},
    isLogin: isLogin(),
    error: '',
  },
  reducers: {
    logoutUser: (state) => {
      logout();
      state.isLogin = false;
      state.user = {};
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      const user = action.payload;
      state.status = 'succeeded';
      login(user);
      state.isLogin = true;
      state.user = user;
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
