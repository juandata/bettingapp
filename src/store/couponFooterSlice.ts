import { createSlice } from '@reduxjs/toolkit';
import { couponFooterState } from './initialState';
import { CouponFooterTypes } from './stateTypes';
export const couponFooterSlice = createSlice({
  name: 'couponFooter',
  initialState: couponFooterState,
  reducers: {
    reduceCouponFooter: (
      _state: CouponFooterTypes,
      action: {
        payload: CouponFooterTypes;
        type: string;
      }
    ) => {
      return action.payload;
    },
  },
});

export const { reduceCouponFooter } = couponFooterSlice.actions;

export default couponFooterSlice.reducer;
