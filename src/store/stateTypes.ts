import { ReducerAction } from 'react';
import { LocksProps, AccordeonDataConverterProps, EventsArrayProps } from '../types/type';

export type ServerResponseType = {
  status: number;
  message: string;
  room?: string;
  NodeId?: string | number;
  error: string;
};
export type DataServerResponse = {
  events: Array<AccordeonDataConverterProps>;
  liveEventsCount: number;
};
export type UserInterface = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  id: string;
  bets: {
    [key: string]: {
      couponData: CouponDataType;
      time: Date;
      couponFooter: CouponFooterTypes;
    };
  };
};
export type BetInterface = {
  game: {
    ParentNodeId: string;
    SportHandle: string;
    Name: string;
    Locked: boolean;
  };
  result: {
    Odd: number;
    NodeId: string;
    Name: string;
    Locked: boolean;
    SportHandle: string;
    EventId: string;
  };
  name: string;
  locks?: LocksProps;
};
export type DisplayLiveDetail = {
  parentNodeId: string;
  name: string;
  locks: LocksProps;
};
export type ActionTypes = {
  expandCoupon: boolean;
  makeBet: boolean;
  approveBet: boolean | null;
  connectionError: string;
  roomToDelete: string;
  displayLiveDetail: {
    [key: string]: DisplayLiveDetail;
  };
  lastLiveDetailId: string;
};

export type CouponDataType = {
  [key: string]: BetInterface;
};
export interface KeyStringType {
  [key: string]: string;
}
export type CouponFooterTypes = {
  combined: boolean | null;
  betEarnings: number | null | string;
  betOddWithMultipleBets: number | null | string;
  totalBet: number | null | string;
  betsDivided: KeyStringType;
  notCombinedBetsState: KeyStringType;
  error: boolean;
  state: string;
};
export type LiveDetailDataInterface = {
  [key: string]: EventsArrayProps;
};
export interface CodereDataProps {
  LiveSport: Array<AccordeonDataConverterProps>;
  LiveEventsCount: number;
}
export interface StoreInterface {
  userData: UserInterface;
  userActions: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchUserData: React.Dispatch<ReducerAction<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchUserAction: React.Dispatch<ReducerAction<any>>;
}
