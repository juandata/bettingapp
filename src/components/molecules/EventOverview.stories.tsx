import React from 'react';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EventOverview from './EventOverview';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'EventOverview',
  component: EventOverview,
} as ComponentMeta<typeof EventOverview>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof EventOverview> = (args) => (
  <MockProvider>
    <EventOverview {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
Component.args = { data: getHomeLiveEvents.events[1].Events[0] };
