import { createSlice } from '@reduxjs/toolkit';
import { liveDetailState } from './initialState';
import { LiveDetailDataInterface } from './stateTypes';
export const liveDetailDataSlice = createSlice({
  name: 'liveDetailData',
  initialState: liveDetailState,
  reducers: {
    reduceLiveDetailData: (
      state: LiveDetailDataInterface,
      action: {
        payload: LiveDetailDataInterface;
        type: string;
      }
    ) => {
      const key = Object.keys(action.payload)[0];
      state[key] = action.payload[key];
    },
    deleteLiveDetailData: (
      state: LiveDetailDataInterface,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      delete state[action.payload];
    },
  },
});

export const { reduceLiveDetailData, deleteLiveDetailData } = liveDetailDataSlice.actions;

export default liveDetailDataSlice.reducer;
