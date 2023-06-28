import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CouponFooter from './CouponFooter';
import MockProvider from '../../integrationTests/Provider';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CouponFooter',
  component: CouponFooter,
} as ComponentMeta<typeof CouponFooter>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CouponFooter> = (args) => (
  <MockProvider>
    <CouponFooter {...args} />
  </MockProvider>
);

export const Component = Template.bind({});
