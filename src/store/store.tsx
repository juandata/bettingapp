import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import codereDataSlice from './codereDataSlice';
import liveDetailDataSlice from './liveDetailDataSlice';
import couponDataSlice from './couponDataSlice';
import couponFooterSlice from './couponFooterSlice';
import userDataSlice from './userDataSlice';
import userActionsSlice from './userActionsSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  codereData: codereDataSlice,
  liveDetailData: liveDetailDataSlice,
  couponData: couponDataSlice,
  couponFooter: couponFooterSlice,
  userData: userDataSlice,
  userActions: userActionsSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
