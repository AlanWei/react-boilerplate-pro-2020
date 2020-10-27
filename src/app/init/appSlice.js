import { createSlice } from '@reduxjs/toolkit';

const PAGE_PREFIX = 'app';

export const appSlice = createSlice({
  name: PAGE_PREFIX,
  initialState: {
    notificationTitle: '',
    notificationContent: '',
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
});

export const selectNotificationTitle = (state) =>
  state[PAGE_PREFIX].notificationTitle;
export const selectNotificationContent = (state) =>
  state[PAGE_PREFIX].notificationContent;

export default appSlice.reducer;
