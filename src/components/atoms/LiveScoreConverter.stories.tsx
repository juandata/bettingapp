import React from 'react';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LiveScoreConverter from './LiveScoreConverter';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'LiveScoreConverter',
  component: LiveScoreConverter,
} as ComponentMeta<typeof LiveScoreConverter>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LiveScoreConverter> = (args) => (
  <MockProvider>
    <LiveScoreConverter {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
const sourceData = getHomeLiveEvents.LiveSport[1].Events[0];
Component.args = { data: sourceData.liveData, result: sourceData.liveData.ResultHome, home: true };
