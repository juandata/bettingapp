import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LiveDetail from './LiveDetail';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { userActionsSlice, liveDetailDataSlice } from '../../mockData';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'LiveDetail',
  component: LiveDetail,
} as ComponentMeta<typeof LiveDetail>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LiveDetail> = (args) => (
  <ThemeProvider theme={theme}>
    <Provider
      store={setupStore({
        liveDetailData: liveDetailDataSlice,
        userActions: userActionsSlice,
      })}
    >
      <BrowserRouter>
        <LiveDetail />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export const Component = Template.bind({});
