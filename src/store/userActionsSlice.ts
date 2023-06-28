import { createSlice } from '@reduxjs/toolkit';
import { userActions } from './initialState';
import { ActionTypes } from './stateTypes';
export const userActionsSlice = createSlice({
  name: 'userActions',
  initialState: userActions,
  reducers: {
    reduceUserActions: (
      _state: ActionTypes,
      action: {
        payload: ActionTypes;
        type: string;
      }
    ) => {
      return action.payload;
    },
  },
});

export const { reduceUserActions } = userActionsSlice.actions;

export default userActionsSlice.reducer;
