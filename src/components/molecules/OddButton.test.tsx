import React from 'react';
import { render } from '@testing-library/react';
import OddButton from './OddButton';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import theme from '../../styles/theme';
import {setupStore} from '../../store/store';

const events = getHomeLiveEvents.events[0].Events;

describe('Renders the button and odds of a specific market', () => {
  it('Should render the odds of a specific market .', () => {
    const firstEventGames = events[0].Games;
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <OddButton el={firstEventGames[0]} ele={firstEventGames[0].Results[0]} name={events[0].Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(getByText('2.4')).toBeInTheDocument();
  });
});
