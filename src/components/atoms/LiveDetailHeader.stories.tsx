import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LiveDetailHeader from './LiveDetailHeader';
import { liveDetailDataSlice } from '../../mockData';
import MockProvider from '../../integrationTests/Provider';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'LiveDetailHeader',
  component: LiveDetailHeader,
} as ComponentMeta<typeof LiveDetailHeader>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LiveDetailHeader> = (args) => (
  <MockProvider>
    <LiveDetailHeader {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
Component.args = { data: liveDetailDataSlice[6760114061] };
