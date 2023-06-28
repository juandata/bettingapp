import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

/**
 * Provider for testing purposes
 * @param children the component to be wrapped inside the provider
 */
const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * TODO:
   * Fix component not being rendered in storybook
   */
  return (
    <ThemeProvider theme={theme}>
      <Provider store={setupStore()}>
        <BrowserRouter> {children} </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
export default MockProvider;
