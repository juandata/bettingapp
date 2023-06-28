import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabPanel from './TabPanel';
import MockProvider from '../../integrationTests/Provider';
import { TabPanelProps } from '../atoms/TabPanel';
import { userActions, category, locked } from './TabPanel.test';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'TabPanel',
  component: TabPanel,
} as ComponentMeta<typeof TabPanelProps>;
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TabPanel> = (args) => (
  <MockProvider>
    <TabPanel {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
//const sourceData = getHomeLiveEvents.events[1].Events[0];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Component.args = { userActions: userActions, category: category, locked: locked };
