import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomePage from './HomePage';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof HomePage> = (args) => (
  <MockProvider>
    <HomePage />
  </MockProvider>
);

export const Component = Template.bind({});
//const sourceData = getHomeLiveEvents.events[1].Events[0];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
