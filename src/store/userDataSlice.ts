import { createSlice } from '@reduxjs/toolkit';
import { userDataState } from './initialState';
import { UserInterface } from './stateTypes';
export const userDataSlice = createSlice({
  name: 'userData',
  initialState: userDataState,
  reducers: {
    reduceUserData: (
      _state: UserInterface,
      action: {
        payload: UserInterface;
        type: string;
      }
    ) => {
      return action.payload;
    },
  },
});

export const { reduceUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
