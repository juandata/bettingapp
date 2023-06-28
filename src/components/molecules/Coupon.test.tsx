import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Coupon from './Coupon';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import theme from '../../styles/theme';
import {setupStore} from '../../store/store';

describe('Renders a Coupon component with the header tabs and descriptions', () => {
  beforeEach(() => {
    render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Coupon />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
  });
  it('Should render the headers tabs title of the coupon', () => {
    expect(screen.getByText('Ticket')).toBeInTheDocument();
    expect(screen.getByText('Apuestas')).toBeInTheDocument();
  });
  it('Should render the description of the tabs once is clicked', () => {
    expect(screen.getByText('Las selecciones serán añadidas')).toBeInTheDocument();
    userEvent.click(screen.getByText('Apuestas'));
    expect(screen.getByText('Las apuestas realizadas serán añadidas')).toBeInTheDocument();
    expect(screen.queryByText('Las selecciones serán añadidas')).toBeNull();
  });
});
