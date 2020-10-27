import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const PAGE_PREFIX = 'outletDetail';

export const getOutlet = createAsyncThunk(`${PAGE_PREFIX}/outlets`, (id) =>
  api.get(`/outlets/${id}`),
);

export const outletDetailSlice = createSlice({
  name: PAGE_PREFIX,
  initialState: {
    status: 'idle',
    outlet: {},
    error: '',
  },
  extraReducers: {
    [getOutlet.pending]: (state) => {
      state.status = 'loading';
    },
    [getOutlet.fulfilled]: (state, action) => {
      const outlet = action.payload;
      state.status = 'succeeded';
      state.outlet = outlet;
    },
    [getOutlet.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectOutlet = (state) => state[PAGE_PREFIX].outlet;

export default outletDetailSlice.reducer;
