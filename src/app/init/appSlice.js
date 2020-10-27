import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const PAGE_PREFIX = 'app';

export const getNotices = createAsyncThunk(`${PAGE_PREFIX}/getNotices`, () =>
  api.get('/notices'),
);

export const deleteNotice = createAsyncThunk(
  `${PAGE_PREFIX}/deleteNotice`,
  (id) => api.delete(`/notices/${id}`),
);

export const appSlice = createSlice({
  name: PAGE_PREFIX,
  initialState: {
    status: 'idle',
    notices: [],
    notificationTitle: '',
    notificationContent: '',
    error: '',
  },
  reducers: {
    updateNotification: (state, action) => {
      const { title, content } = action.payload;
      state.notificationTitle = title;
      state.notificationContent = content;
    },
    resetNotification: (state) => {
      state.notificationTitle = '';
      state.notificationContent = '';
    },
  },
  extraReducers: {
    [getNotices.pending]: (state) => {
      state.status = 'loading';
    },
    [getNotices.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notices = action.payload;
    },
    [getNotices.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectNotices = (state) => state[PAGE_PREFIX].notices;
export const selectNotificationTitle = (state) =>
  state[PAGE_PREFIX].notificationTitle;
export const selectNotificationContent = (state) =>
  state[PAGE_PREFIX].notificationContent;

export default appSlice.reducer;
