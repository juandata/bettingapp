import React from 'react';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccordeonDataConverter from './AccordeonDataConverter';
import MockProvider from '../../integrationTests/Provider';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'AccordeonDataConverter',
  component: AccordeonDataConverter,
} as ComponentMeta<typeof AccordeonDataConverter>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AccordeonDataConverter> = (args) => {
  return (
    <MockProvider>
      <AccordeonDataConverter {...args} />
    </MockProvider>
  );
};

export const Component = Template.bind({});
Component.args = { data: getHomeLiveEvents.LiveSport[0] };
