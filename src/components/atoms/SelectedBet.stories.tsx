import React from 'react';
//import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectedBet from './SelectedBet';
import MockProvider from '../../integrationTests/Provider';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'SelectedBet',
  component: SelectedBet,
} as ComponentMeta<typeof SelectedBet>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SelectedBet> = (args) => (
  <MockProvider>
    <SelectedBet {...args} />
  </MockProvider>
);

const mockedData = {
  bet: {
    game: {
      Results: [
        {
          Odd: 3,
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
          GameId: '6744932361',
          GameTypeId: 1,
          GameSpecialOddsValue: '',
          GameBetTypeAvailability: 0,
          GameNumberOfStarters: 0,
          Name: 'Altona Magic SC',
          NodeId: '6744932382',
          ParentNodeId: '6744932361',
          Priority: 0,
          SportHandle: 'soccer',
          Locked: false,
        },
        {
          Odd: 2.75,
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
          GameId: '6744932361',
          GameTypeId: 1,
          GameSpecialOddsValue: '',
          GameBetTypeAvailability: 0,
          GameNumberOfStarters: 0,
          Name: 'X',
          NodeId: '6744932383',
          ParentNodeId: '6744932361',
          Priority: 1,
          SportHandle: 'soccer',
          Locked: false,
        },
        {
          Odd: 2.4,
          SortOrder: 2,
          IsLive: true,
          upOdd: false,
          downOdd: false,
          IsNonRunner: false,
          SportId: '2817453298',
          LocationId: '2817453310',
          LeagueId: '3009130476',
          EventId: '6744932314',
          EventHasHandicap: false,
          GameId: '6744932361',
          GameTypeId: 1,
          GameSpecialOddsValue: '',
          GameBetTypeAvailability: 0,
          GameNumberOfStarters: 0,
          Name: 'Hume City',
          NodeId: '6744932384',
          ParentNodeId: '6744932361',
          Priority: 2,
          SportHandle: 'soccer',
          Locked: false,
        },
      ],
      DisplayTypeName: '3way',
      CategoryInfo: {
        CategoryId: '99',
        CategoryName: 'PRINCIPALES',
        IsRelevant: true,
      },
      CategoryInfos: [
        {
          CategoryId: '99',
          CategoryName: 'PRINCIPALES',
          IsRelevant: true,
        },
      ],
      GameType: 1,
      SmartMarketAvailable: true,
      Spov: '',
      Name: '1X2',
      NodeId: '6744932361',
      ParentNodeId: '6744932314',
      Priority: 9990,
      SportHandle: 'soccer',
      Locked: false,
    },
    result: {
      Odd: 3,
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
      GameId: '6744932361',
      GameTypeId: 1,
      GameSpecialOddsValue: '',
      GameBetTypeAvailability: 0,
      GameNumberOfStarters: 0,
      Name: 'Altona Magic SC',
      NodeId: '6744932382',
      ParentNodeId: '6744932361',
      Priority: 0,
      SportHandle: 'soccer',
      Locked: false,
    },
    name: 'Altona Magic SC - Hume City',
  },
  key: '6744932382',
  combined: true,
  combinedBetDivided: 0,
  onBlur: () => console.log('onBlur triggered'),
};
export const Component = Template.bind({});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Component.args = mockedData;
