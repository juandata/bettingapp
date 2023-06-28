import { createSlice } from '@reduxjs/toolkit';
import { couponState } from './initialState';
import { CouponDataType } from './stateTypes';
export const couponDataSlice = createSlice({
  name: 'couponData',
  initialState: couponState,
  reducers: {
    reduceCouponData: (
      state: CouponDataType,
      action: {
        payload: CouponDataType;
        type: string;
      }
    ) => {
      const key = Object.keys(action.payload)[0];
      state[key] = action.payload[key];
    },
    deleteCouponData: (
      state: CouponDataType,
      action: {
        payload: string;
        type: string;
      }
    ) => {
      delete state[action.payload];
    },
    clearCouponData: (
      _state: object,
      action: {
        payload: object;
        type: string;
      }
    ) => {
      return action.payload;
    },
  },
});

export const { reduceCouponData, deleteCouponData, clearCouponData } = couponDataSlice.actions;

export default couponDataSlice.reducer;
