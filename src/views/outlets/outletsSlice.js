import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const PAGE_PREFIX = 'outlets';

export const getOutlets = createAsyncThunk(`${PAGE_PREFIX}/outlets`, () =>
  api.get('/outlets'),
);

export const outletsSlice = createSlice({
  name: PAGE_PREFIX,
  initialState: {
    status: 'idle',
    outlets: [],
    error: '',
  },
  extraReducers: {
    [getOutlets.pending]: (state) => {
      state.status = 'loading';
    },
    [getOutlets.fulfilled]: (state, action) => {
      const outlets = action.payload;
      state.status = 'succeeded';
      state.outlets = outlets;
    },
    [getOutlets.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectOutlets = (state) => state[PAGE_PREFIX].outlets;

export default outletsSlice.reducer;
