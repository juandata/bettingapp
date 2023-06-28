import React from 'react';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OddsOverview from './OddsOverview';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'OddsOverview',
  component: OddsOverview,
} as ComponentMeta<typeof OddsOverview>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof OddsOverview> = (args) => (
  <MockProvider>
    <OddsOverview {...args} />
  </MockProvider>
);

export const Component = Template.bind({});

Component.args = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  games: getHomeLiveEvents.events[6].Events[0].Games,
  name: getHomeLiveEvents.events[6].Events[0].Name,
};
