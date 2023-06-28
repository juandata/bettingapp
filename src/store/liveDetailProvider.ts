import { createContext } from 'react';
import { liveDetailState } from './initialState';
import { LiveDetailInterface } from './liveDetailProviderTypes';

const LiveDetailProvider = createContext<LiveDetailInterface>({
  liveDetailData: liveDetailState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatchLiveDetailData: function (_value: unknown): void {
    throw new Error('Function dispatchLiveDetailData not implemented.');
  },
});
export default LiveDetailProvider;
