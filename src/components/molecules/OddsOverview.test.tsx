import React from 'react';
import { render } from '@testing-library/react';
import OddsOverview from './OddsOverview';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import theme from '../../styles/theme';
import {setupStore} from '../../store/store';
import Results from './Results';
const events = getHomeLiveEvents.LiveSport[0].Events;

describe('Renders the different markets of an event with titles and odds..', () => {
  it('Should render the title and the odds of an event.', () => {
    const firstEventGames = events[0].Games;
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <BrowserRouter>
              <OddsOverview games={firstEventGames} name={events[0].Name} />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    const mainTitle = getByText('Más/Menos Total Goles');
    const oddName1 = getByText('Más 6.5');
    const oddName2 = getByText('Menos 6.5');
    const odd1 = getByText('2.4');
    const odd2 = getByText('1.5');
    expect(mainTitle).toBeInTheDocument();
    expect(oddName1).toBeInTheDocument();
    expect(oddName2).toBeInTheDocument();
    expect(odd1).toBeInTheDocument();
    expect(odd2).toBeInTheDocument();
  });
  it('Should render a locked icon when Locked propery is true.', () => {
    const firstEventGamesCopy = { ...events[0].Games };
    firstEventGamesCopy[0].Locked = true;
    const { queryByText, getByTestId } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <BrowserRouter>
              <OddsOverview games={firstEventGamesCopy} name={events[0].Name} />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(queryByText('Más 6.5')).not.toBeInTheDocument();
    expect(getByTestId('lock-icon')).toBeInTheDocument();
  });
});
