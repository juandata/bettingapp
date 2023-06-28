import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutPage from './AboutPage';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'AboutPage',
  component: AboutPage,
} as ComponentMeta<typeof AboutPage>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AboutPage> = (args) => (
  <MockProvider>
    <AboutPage />
  </MockProvider>
);

export const Component = Template.bind({});
//const sourceData = getHomeLiveEvents.events[1].Events[0];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
