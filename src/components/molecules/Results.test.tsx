import React from 'react';
import { render } from '@testing-library/react';
import Results from './Results';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import theme from '../../styles/theme';
import {setupStore} from '../../store/store';
const events = getHomeLiveEvents.events[0].Events;

describe('Renders the different markets of an event with titles and odds..', () => {
  it('Should render "no results available" when empty prop.', () => {
    const el = events[0].Games[0];

    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Results el={el} results={[]} name={events[0].Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(getByText('no results available')).toBeInTheDocument();
  });
  it('Should render the correct title and name of a game.', async () => {
    const results = events[0].Games[0].Results;
    const el = events[0].Games[0];

    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Results el={el} results={results} name={events[0].Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(getByText(results[0].Name)).toBeInTheDocument();
    expect(getByText(el.Name)).toBeInTheDocument();
  });
  it('Should render the correct name of an event depending if it starts with "ganador".', async () => {
    const results = events[1].Games[0].Results;
    const el = events[1].Games[0];
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Results el={el} results={results} name={events[1].Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(getByText(el.Name)).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('X')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });
  it('In Handicap markets it hould render the first part of the name and the handicap odds".', async () => {
    const events = getHomeLiveEvents.events[2].Events;
    const results = events[2].Games[1].Results;
    const el = events[2].Games[1];

    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Results el={el} results={results} name={events[2].Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(getByText(el.Name)).toBeInTheDocument();
    const nameSplitted = results[0].Name.split(' ');
    const name = results[0].Name.slice(0, 3).toUpperCase();
    const handicapNameShorted = name + nameSplitted[nameSplitted.length - 1];
    expect(getByText(handicapNameShorted)).toBeInTheDocument();
  });
  it('Should render a locked icon when Locked propery is true.', () => {
    const KashiwaVsGamba = events[2];
    const el = KashiwaVsGamba.Games[0];
    const results = KashiwaVsGamba.Games[0].Results;
    const { queryByText, getByTestId } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <Results el={el} results={results} name={KashiwaVsGamba.Name} />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    expect(queryByText('Más 6.5')).not.toBeInTheDocument();
    expect(getByTestId('lock-icon')).toBeInTheDocument();
  });
});
