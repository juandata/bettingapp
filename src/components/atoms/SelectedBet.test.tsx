import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectedBet from './SelectedBet';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import MockProvider from '../../integrationTests/Provider';
//import { liveDetailState } from '../store/initialState';
//import { userActionsState, userState } from '../store/mockedState';
const events = getHomeLiveEvents.events[0].Events;
/*const couponState = {
  '6760114101': {
    game: {
      Results: [
        {
          Odd: 2.4,
          SortOrder: 0,
          IsLive: true,
          upOdd: false,
          downOdd: false,
          IsNonRunner: false,
          SportId: '2817453298',
          LocationId: '3006581819',
          LeagueId: '3009137309',
          EventId: '6649152292',
          EventHasHandicap: false,
          GameId: '6760114061',
          GameTypeId: 18,
          GameSpecialOddsValue: '<Spov>6.5',
          GameBetTypeAvailability: 0,
          GameNumberOfStarters: 0,
          Name: 'Más 6.5',
          NodeId: '6760114101',
          ParentNodeId: '6760114061',
          Priority: 0,
          SportHandle: 'soccer',
          Locked: false,
        },
        {
          Odd: 1.5,
          SortOrder: 1,
          IsLive: true,
          upOdd: false,
          downOdd: false,
          IsNonRunner: false,
          SportId: '2817453298',
          LocationId: '3006581819',
          LeagueId: '3009137309',
          EventId: '6649152292',
          EventHasHandicap: false,
          GameId: '6760114061',
          GameTypeId: 18,
          GameSpecialOddsValue: '<Spov>6.5',
          GameBetTypeAvailability: 0,
          GameNumberOfStarters: 0,
          Name: 'Menos 6.5',
          NodeId: '6760114102',
          ParentNodeId: '6760114061',
          Priority: 1,
          SportHandle: 'soccer',
          Locked: false,
        },
      ],
      DisplayTypeName: '2buttonline',
      CategoryInfo: {
        CategoryId: '99',
        CategoryName: 'PRINCIPALES',
        IsRelevant: false,
      },
      CategoryInfos: [
        {
          CategoryId: '99',
          CategoryName: 'PRINCIPALES',
          IsRelevant: true,
        },
        {
          CategoryId: '82',
          CategoryName: 'GOLES',
          IsRelevant: false,
        },
      ],
      GameType: 18,
      SmartMarketAvailable: true,
      Spov: '<Spov>6.5',
      Name: 'Más/Menos Total Goles',
      NodeId: '6760114061',
      ParentNodeId: '6649152292',
      Priority: 9965,
      SportHandle: 'soccer',
      Locked: false,
    },
    result: {
      Odd: 2.4,
      SortOrder: 0,
      IsLive: true,
      upOdd: false,
      downOdd: false,
      IsNonRunner: false,
      SportId: '2817453298',
      LocationId: '3006581819',
      LeagueId: '3009137309',
      EventId: '6649152292',
      EventHasHandicap: false,
      GameId: '6760114061',
      GameTypeId: 18,
      GameSpecialOddsValue: '<Spov>6.5',
      GameBetTypeAvailability: 0,
      GameNumberOfStarters: 0,
      Name: 'Más 6.5',
      NodeId: '6760114101',
      ParentNodeId: '6760114061',
      Priority: 0,
      SportHandle: 'soccer',
      Locked: false,
    },
    name: 'Sagan Tosu - Shonan Bellmare',
    locks: {
      eventOverview: false,
      oddsOverview: false,
    },
  },
};
const couponFooterState = {
  combined: true,
  betEarnings: null,
  betOddWithMultipleBets: null,
  totalBet: 0,
  betsDivided: {
    '6760114101': '',
  },
  error: true,
  state: '',
  notCombinedBetsState: {},
};
*/
const renderProvider = (children: React.ReactNode) => {
  return render(<MockProvider>{children} </MockProvider>);
};
describe('Renders the bet selected by a user', () => {
  /**
   * TODO:
   * Find why the SelectedBet component is not being rendered, currently this test is failing
   */
  it('Should render the odd, markets and participants of a selected event', () => {
    const sportEventMocked = events[0];
    const couponDataMocked = {
      [sportEventMocked.Games[0].Results[0].NodeId]: {
        game: sportEventMocked.Games[0],
        result: sportEventMocked.Games[0].Results[0],
        name: sportEventMocked.Name,
      },
    };
    const couponKeysMocked = Object.keys(couponDataMocked);
    renderProvider(<SelectedBet bet={couponDataMocked[couponKeysMocked[0]]} />);
    expect(screen.getByText('2.4')).toBeInTheDocument();
    expect(screen.getByText('Más/Menos Total Goles')).toBeInTheDocument();
    expect(screen.getByText('Sagan Tosu - Shonan Bellmare')).toBeInTheDocument();
  });
  it('Should render a locked icon when the data contains a Locked true prop in game level', () => {
    const sportEventMocked = events[0];
    sportEventMocked.Games[0].Locked = true;
    const couponDataMocked = {
      [sportEventMocked.Games[0].Results[0].NodeId]: {
        game: sportEventMocked.Games[0],
        result: sportEventMocked.Games[0].Results[0],
        name: sportEventMocked.Name,
      },
    };
    const couponKeysMocked = Object.keys(couponDataMocked);
    renderProvider(<SelectedBet key={couponKeysMocked[0]} bet={couponDataMocked[couponKeysMocked[0]]} />);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
  it('Should render a locked icon when the data contains a Locked true prop in result level', () => {
    /**
     * TODO:
     * Why is not rendering anything?
     */
    const sportEventMocked = events[2];
    const couponDataMocked = {
      [sportEventMocked.Games[0].Results[0].NodeId]: {
        game: sportEventMocked.Games[0],
        result: sportEventMocked.Games[0].Results[0],
        name: sportEventMocked.Name,
        locks: {
          oddsOverview: sportEventMocked.Locked,
          eventOverview: events[2].Locked,
        },
      },
    };
    const couponKeysMocked = Object.keys(couponDataMocked);
    renderProvider(<SelectedBet key={couponKeysMocked[0]} bet={couponDataMocked[couponKeysMocked[0]]} />);
    screen.debug(undefined, Infinity);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
});
