export interface AccordeonDataConverterProps {
  Events: Array<EventsArrayProps>;
  Name: string;
  Locked: boolean;
  SportHandle: string;
}
type LocalizedValuesArrayProps = {
  Value: string;
};
export type ParticipantsArrayProps = {
  IsHome: boolean;
  LocalizedNames: {
    LocalizedValues: Array<LocalizedValuesArrayProps>;
  };
}; /**
 * TODO:
Live detail data must be an array
because several liveDetail data request
must be handled at the same time

 */
export type EventsArrayProps = {
  Participants: Array<ParticipantsArrayProps>;
  liveData: LiveDataProps;
  Locked: boolean;
  Games: Array<GamesProps>;
  Name: string;
  SportHandle: string;
  StatisticsId: string;
  SportName?: string;
  LeagueName?: string;
  CountryName?: string;
  StartDate?: string;
};

export interface EventOverviewProps {
  data: EventsArrayProps;
  lock?: boolean;
}
export type LocksProps = {
  eventOverview: boolean;
  oddsOverview: boolean;
};
export interface OddsOverviewProps {
  games: Array<GamesProps>;
  name: string;
  locks?: LocksProps | undefined;
}
export type ResultProps = {
  el: {
    Locked: boolean;
    Name: string;
    DisplayTypeName: string;
  };
  results: Array<ResultsArrayProps>;
  name: string;
  locks?: LocksProps | undefined;
  showTitle?: boolean;
};
export type LiveScoreConverterProps = {
  data: LiveDataProps;
  result: string | number;
  home: boolean;
};
export type LiveDataProps = {
  PeriodName: string;
  MatchTime: number;
  Time: string;
  RemainingPeriodTime: string;
  ResultHome: number;
  ResultAway: number;
  ParticipantHome: string;
  ParticipantAway: string;
  Sets?: Array<number> | number[][];
  Quarters?: Array<number> | number[][];
  Periods?: Array<number> | number[][];
  Innings?: Array<number> | number[][];
  YellowCardsHome?: number;
  RedCardsHome?: number;
  YellowCardsAway?: number;
  RedCardsAway?: number;
};
export type ResultsArrayProps = {
  SortOrder: number;
  Name: string;
  Odd: string | number;
  NodeId: string;
  Locked: boolean;
};
type CategoryInfoProps = {
  CategoryId: number | string;
  CategoryName: string;
  IsRelevant: boolean;
};
export type GamesProps = {
  ParentNodeId: string;
  Locked: boolean;
  NodeId: string;
  Results: Array<ResultsArrayProps>;
  Name: string;
  DisplayTypeName: string;
  CategoryInfo: CategoryInfoProps;
  CategoryInfos: CategoryInfoProps[];
  SportHandle: string;
};
