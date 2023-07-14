import { createSlice } from '@reduxjs/toolkit';
import { codereDataState } from './initialState';
import { AccordeonDataConverterProps } from '../types/type';
import { CodereDataProps } from './stateTypes';
export const codereDataSlice = createSlice({
  name: 'codereData',
  initialState: codereDataState,
  reducers: {
    reduceCodereData: (
      state: CodereDataProps,
      action: {
        payload: { LiveSport: Array<AccordeonDataConverterProps>; LiveEventsCount: number };
        type: string;
      }
    ) => {
      state.LiveSport = action.payload.LiveSport;
      state.LiveEventsCount = action.payload.LiveEventsCount;
    },
  },
});

export const { reduceCodereData } = codereDataSlice.actions;

export default codereDataSlice.reducer;
