import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonWithLoader from './ButtonWithLoader';
import MockProvider from '../../integrationTests/Provider';
import { userDataState, couponState, codereDataState, couponFooterState } from '../../store/initialState';
const liveDetailState = {
  initial: {
    Participants: [
      {
        IsHome: false,
        LocalizedNames: {
          LocalizedValues: [{ Value: '' }],
        },
      },
    ],
    liveData: {
      PeriodName: '',
      MatchTime: 0,
      RemainingPeriodTime: '',
      ResultHome: 0,
      ResultAway: 0,
      ParticipantHome: '',
      ParticipantAway: '',
      Sets: [],
      Quarters: [],
      Periods: [],
      Innings: [],
    },
    Locked: true,
    Games: [],
    Name: '',
  },
};
const mockState = {
  userDataState,
  couponState,
  codereDataState,
  liveDetailState,
  couponFooterState,
};
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ButtonWithLoader',
  component: ButtonWithLoader,
} as ComponentMeta<typeof ButtonWithLoader>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ButtonWithLoader> = (args) => (
  <MockProvider>
    <ButtonWithLoader {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
//const sourceData = getHomeLiveEvents.events[1].Events[0];
Component.args = { text: 'Apostar' };
