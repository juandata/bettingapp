import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Coupon from './Coupon';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Coupon',
  component: Coupon,
} as ComponentMeta<typeof Coupon>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Coupon> = (args) => (
  <MockProvider>
    <Coupon {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
