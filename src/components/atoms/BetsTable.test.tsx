import React from 'react';
import BetsTable from './BetsTable';
import renderWithProviders from '../../integrationTests/Provider2';

describe('Renders the BetsTable component', () => {
  it('Should render a single bet correctly', () => {
    const userDataSlice = {
      firstName: 'Juan David',
      lastName: 'lastName',
      email: '',
      password: '',
      phone: '',
      id: '1053783846',
      bets: {
        '9f996fbf81e9': {
          couponData: {
            '6760210303': {
              game: {
                Results: [
                  {
                    Odd: 1.65,
                    SortOrder: 0,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6744932314',
                    EventHasHandicap: false,
                    GameId: '6760210236',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>1.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Más 1.5',
                    NodeId: '6760210303',
                    ParentNodeId: '6760210236',
                    Priority: 0,
                    SportHandle: 'soccer',
                    Locked: false,
                  },
                  {
                    Odd: 2.1,
                    SortOrder: 1,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6744932314',
                    EventHasHandicap: false,
                    GameId: '6760210236',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>1.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Menos 1.5',
                    NodeId: '6760210304',
                    ParentNodeId: '6760210236',
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
                Spov: '<Spov>1.5',
                Name: 'Más/Menos Total Goles',
                NodeId: '6760210236',
                ParentNodeId: '6744932314',
                Priority: 9965,
                SportHandle: 'soccer',
                Locked: false,
              },
              result: {
                Odd: 1.65,
                SortOrder: 0,
                IsLive: true,
                upOdd: false,
                downOdd: false,
                IsNonRunner: false,
                SportId: '2817453298',
                LocationId: '2817453310',
                LeagueId: '3009130476',
                EventId: '6744932314',
                EventHasHandicap: false,
                GameId: '6760210236',
                GameTypeId: 18,
                GameSpecialOddsValue: '<Spov>1.5',
                GameBetTypeAvailability: 0,
                GameNumberOfStarters: 0,
                Name: 'Más 1.5',
                NodeId: '6760210303',
                ParentNodeId: '6760210236',
                Priority: 0,
                SportHandle: 'soccer',
                Locked: false,
              },
              name: 'Altona Magic SC - Hume City',
              locks: {
                eventOverview: false,
                oddsOverview: false,
              },
            },
          },
          time: '2023-06-12T18:01:27.821Z',
          couponFooter: {
            combined: true,
            betEarnings: 16.5,
            betOddWithMultipleBets: '1.65',
            totalBet: '10',
            betsDivided: {
              '6760210303': '',
            },
            error: false,
            state: 'Pendiente',
            notCombinedBetsState: {},
          },
        },
      },
    };

    const betIds = Object.keys(userDataSlice.bets);
    const { getByText } = renderWithProviders(<BetsTable betId={betIds[0]} />, {
      preloadedState: {
        userData: userDataSlice,
      },
    });
    expect(getByText('Evento')).toBeInTheDocument();
    const betParticipants = getByText('Altona Magic SC - Hume City');
    expect(betParticipants).toBeInTheDocument();
    expect(getByText('Mercado')).toBeInTheDocument();
    expect(getByText('Más/Menos Total Goles')).toBeInTheDocument();
    expect(getByText('Elección')).toBeInTheDocument();
    expect(getByText('Más 1.5')).toBeInTheDocument();
    expect(getByText('Cuota')).toBeInTheDocument();
    expect(getByText('1.65')).toBeInTheDocument();
    expect(getByText('Total Apostado')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('Ganancias Estimadas')).toBeInTheDocument();
    expect(getByText('16.5')).toBeInTheDocument();
    expect(getByText('Estado')).toBeInTheDocument();
    expect(getByText('Pendiente')).toBeInTheDocument();
  });
  it('Should render a combined bet correctly', () => {
    const userDataSlice = {
      firstName: 'Juan David',
      lastName: 'lastName',
      email: '',
      password: '',
      phone: '',
      id: '1053783846',
      bets: {
        d35b5bd46b9d: {
          couponData: {
            '6760176090': {
              game: {
                Results: [
                  {
                    Odd: 1.72,
                    SortOrder: 0,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Más 3.5',
                    NodeId: '6760176089',
                    ParentNodeId: '6760176010',
                    Priority: 0,
                    SportHandle: 'soccer',
                    Locked: false,
                  },
                  {
                    Odd: 2,
                    SortOrder: 1,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Menos 3.5',
                    NodeId: '6760176090',
                    ParentNodeId: '6760176010',
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
                Spov: '<Spov>3.5',
                Name: 'Más/Menos Total Goles',
                NodeId: '6760176010',
                ParentNodeId: '6743968322',
                Priority: 9965,
                SportHandle: 'soccer',
                Locked: false,
              },
              result: {
                Odd: 2,
                SortOrder: 1,
                IsLive: true,
                upOdd: false,
                downOdd: false,
                IsNonRunner: false,
                SportId: '2817453298',
                LocationId: '2817453310',
                LeagueId: '3009130476',
                EventId: '6743968322',
                EventHasHandicap: false,
                GameId: '6760176010',
                GameTypeId: 18,
                GameSpecialOddsValue: '<Spov>3.5',
                GameBetTypeAvailability: 0,
                GameNumberOfStarters: 0,
                Name: 'Menos 3.5',
                NodeId: '6760176090',
                ParentNodeId: '6760176010',
                Priority: 1,
                SportHandle: 'soccer',
                Locked: false,
              },
              name: 'Port Melbourne Sharks - Avondale United',
              locks: {
                eventOverview: false,
                oddsOverview: false,
              },
            },
            '6760176089': {
              game: {
                Results: [
                  {
                    Odd: 1.72,
                    SortOrder: 0,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Más 3.5',
                    NodeId: '6760176089',
                    ParentNodeId: '6760176010',
                    Priority: 0,
                    SportHandle: 'soccer',
                    Locked: false,
                  },
                  {
                    Odd: 2,
                    SortOrder: 1,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Menos 3.5',
                    NodeId: '6760176090',
                    ParentNodeId: '6760176010',
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
                Spov: '<Spov>3.5',
                Name: 'Más/Menos Total Goles',
                NodeId: '6760176010',
                ParentNodeId: '6743968322',
                Priority: 9965,
                SportHandle: 'soccer',
                Locked: false,
              },
              result: {
                Odd: 1.72,
                SortOrder: 0,
                IsLive: true,
                upOdd: false,
                downOdd: false,
                IsNonRunner: false,
                SportId: '2817453298',
                LocationId: '2817453310',
                LeagueId: '3009130476',
                EventId: '6743968322',
                EventHasHandicap: false,
                GameId: '6760176010',
                GameTypeId: 18,
                GameSpecialOddsValue: '<Spov>3.5',
                GameBetTypeAvailability: 0,
                GameNumberOfStarters: 0,
                Name: 'Más 3.5',
                NodeId: '6760176089',
                ParentNodeId: '6760176010',
                Priority: 0,
                SportHandle: 'soccer',
                Locked: false,
              },
              name: 'Port Melbourne Sharks - Avondale United',
              locks: {
                eventOverview: false,
                oddsOverview: false,
              },
            },
          },
          time: '2023-06-12T19:42:28.995Z',
          couponFooter: {
            combined: true,
            betEarnings: 34.4,
            betOddWithMultipleBets: '3.44',
            totalBet: '10',
            betsDivided: {
              '6760176090': '',
              '6760176089': '',
            },
            error: false,
            state: 'Pendiente',
            notCombinedBetsState: {},
          },
        },
      },
    };

    const betIds = Object.keys(userDataSlice.bets);
    const { getByText, getAllByText } = renderWithProviders(<BetsTable betId={betIds[0]} />, {
      preloadedState: {
        userData: userDataSlice,
      },
    });
    expect(getByText('Evento')).toBeInTheDocument();
    const betParticipants = getAllByText('Port Melbourne Sharks - Avondale United');
    expect(betParticipants.length).toEqual(2);
    expect(getByText('Mercado')).toBeInTheDocument();
    expect(getAllByText('Más/Menos Total Goles').length).toEqual(2);
    expect(getByText('Elección')).toBeInTheDocument();
    expect(getByText('Menos 3.5')).toBeInTheDocument();
    expect(getByText('Cuota')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Más 3.5')).toBeInTheDocument();
    expect(getByText('1.72')).toBeInTheDocument();
    expect(getByText('Total Apostado')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('Combinada')).toBeInTheDocument();
    expect(getByText('Sí')).toBeInTheDocument();
    expect(getByText('Cuota Combinada')).toBeInTheDocument();
    expect(getByText('3.44')).toBeInTheDocument();
    expect(getByText('Ganancias Estimadas')).toBeInTheDocument();
    expect(getByText('34.4')).toBeInTheDocument();
    expect(getByText('Estado')).toBeInTheDocument();
    expect(getByText('Pendiente')).toBeInTheDocument();
  });
  it('Should render a not combined bet correctly', () => {
    const userDataSlice = {
      firstName: 'Juan David',
      lastName: 'lastName',
      email: '',
      password: '',
      phone: '',
      id: '1053783846',
      bets: {
        '3b07cb75c9a7': {
          couponData: {
            '6760176089': {
              game: {
                Results: [
                  {
                    Odd: 1.72,
                    SortOrder: 0,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Más 3.5',
                    NodeId: '6760176089',
                    ParentNodeId: '6760176010',
                    Priority: 0,
                    SportHandle: 'soccer',
                    Locked: false,
                  },
                  {
                    Odd: 2,
                    SortOrder: 1,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Menos 3.5',
                    NodeId: '6760176090',
                    ParentNodeId: '6760176010',
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
                Spov: '<Spov>3.5',
                Name: 'Más/Menos Total Goles',
                NodeId: '6760176010',
                ParentNodeId: '6743968322',
                Priority: 9965,
                SportHandle: 'soccer',
                Locked: false,
              },
              result: {
                Odd: 1.72,
                SortOrder: 0,
                IsLive: true,
                upOdd: false,
                downOdd: false,
                IsNonRunner: false,
                SportId: '2817453298',
                LocationId: '2817453310',
                LeagueId: '3009130476',
                EventId: '6743968322',
                EventHasHandicap: false,
                GameId: '6760176010',
                GameTypeId: 18,
                GameSpecialOddsValue: '<Spov>3.5',
                GameBetTypeAvailability: 0,
                GameNumberOfStarters: 0,
                Name: 'Más 3.5',
                NodeId: '6760176089',
                ParentNodeId: '6760176010',
                Priority: 0,
                SportHandle: 'soccer',
                Locked: false,
              },
              name: 'Port Melbourne Sharks - Avondale United',
              locks: {
                eventOverview: false,
                oddsOverview: false,
              },
            },
            '6760176090': {
              game: {
                Results: [
                  {
                    Odd: 1.72,
                    SortOrder: 0,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Más 3.5',
                    NodeId: '6760176089',
                    ParentNodeId: '6760176010',
                    Priority: 0,
                    SportHandle: 'soccer',
                    Locked: false,
                  },
                  {
                    Odd: 2,
                    SortOrder: 1,
                    IsLive: true,
                    upOdd: false,
                    downOdd: false,
                    IsNonRunner: false,
                    SportId: '2817453298',
                    LocationId: '2817453310',
                    LeagueId: '3009130476',
                    EventId: '6743968322',
                    EventHasHandicap: false,
                    GameId: '6760176010',
                    GameTypeId: 18,
                    GameSpecialOddsValue: '<Spov>3.5',
                    GameBetTypeAvailability: 0,
                    GameNumberOfStarters: 0,
                    Name: 'Menos 3.5',
                    NodeId: '6760176090',
                    ParentNodeId: '6760176010',
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
                Spov: '<Spov>3.5',
                Name: 'Más/Menos Total Goles',
                NodeId: '6760176010',
                ParentNodeId: '6743968322',
                Priority: 9965,
                SportHandle: 'soccer',
                Locked: false,
              },
              result: {
                Odd: 2,
                SortOrder: 1,
                IsLive: true,
                upOdd: false,
                downOdd: false,
                IsNonRunner: false,
                SportId: '2817453298',
                LocationId: '2817453310',
                LeagueId: '3009130476',
                EventId: '6743968322',
                EventHasHandicap: false,
                GameId: '6760176010',
                GameTypeId: 18,
                GameSpecialOddsValue: '<Spov>3.5',
                GameBetTypeAvailability: 0,
                GameNumberOfStarters: 0,
                Name: 'Menos 3.5',
                NodeId: '6760176090',
                ParentNodeId: '6760176010',
                Priority: 1,
                SportHandle: 'soccer',
                Locked: false,
              },
              name: 'Port Melbourne Sharks - Avondale United',
              locks: {
                eventOverview: false,
                oddsOverview: false,
              },
            },
          },
          time: '2023-06-12T20:12:07.259Z',
          couponFooter: {
            combined: false,
            betEarnings: 77.2,
            betOddWithMultipleBets: '3.44',
            totalBet: '40',
            betsDivided: {
              '6760176089': '10',
              '6760176090': '30',
            },
            error: false,
            state: 'Pendiente',
            notCombinedBetsState: {
              '6760176089': 'Pendiente',
              '6760176090': 'Pendiente',
            },
          },
        },
      },
    };

    const betIds = Object.keys(userDataSlice.bets);
    const { getByText, getAllByText, getAllByTestId } = renderWithProviders(<BetsTable betId={betIds[0]} />, {
      preloadedState: {
        userData: userDataSlice,
      },
    });
    expect(getByText('Evento')).toBeInTheDocument();
    const betParticipants = getAllByText('Port Melbourne Sharks - Avondale United');
    expect(betParticipants.length).toEqual(2);

    expect(getByText('Mercado')).toBeInTheDocument();

    expect(getByText('Más 3.5')).toBeInTheDocument();
    expect(getByText('1.72')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('17.2')).toBeInTheDocument();

    expect(getByText('Estado')).toBeInTheDocument();
    expect(getAllByText('Pendiente').length).toEqual(2);
    expect(getByText('Descargar')).toBeInTheDocument();
    expect(getAllByTestId('print-bet-button').length).toEqual(2);

    expect(getAllByText('Más/Menos Total Goles').length).toEqual(2);
    expect(getByText('Elección')).toBeInTheDocument();
    expect(getByText('Menos 3.5')).toBeInTheDocument();
    expect(getByText('Cuota')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Apuesta')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('Ganancia')).toBeInTheDocument();
    expect(getByText('60')).toBeInTheDocument();

    expect(getByText('Total Apostado')).toBeInTheDocument();
    expect(getByText('40')).toBeInTheDocument();
    expect(getByText('Combinada')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
  });
});
