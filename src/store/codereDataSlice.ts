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
        payload: { events: Array<AccordeonDataConverterProps>; liveEventsCount: number };
        type: string;
      }
    ) => {
      state.events = action.payload.events;
      state.liveEventsCount = action.payload.liveEventsCount;
    },
  },
});

export const { reduceCodereData } = codereDataSlice.actions;

export default codereDataSlice.reducer;
