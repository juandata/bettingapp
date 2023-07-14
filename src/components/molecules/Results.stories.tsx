import React from 'react';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Results from './Results';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Results',
  component: Results,
} as ComponentMeta<typeof Results>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Results> = (args) => (
  <MockProvider>
    <Results {...args} />
  </MockProvider>
);

export const Component = Template.bind({});

Component.args = {
  el: getHomeLiveEvents.LiveSport[3].Events[0].Games[2],
  results: getHomeLiveEvents.LiveSport[3].Events[0].Games[2].Results,
  name: getHomeLiveEvents.LiveSport[3].Events[0].Name,
};
