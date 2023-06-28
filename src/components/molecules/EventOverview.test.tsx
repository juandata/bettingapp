import React from 'react';
import { render, screen } from '@testing-library/react';
import EventOverview from './EventOverview';
import { Participants } from './EventOverview';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import getHomeLiveEvents2 from '../../data/getHomeLiveEvents2Mock.json';
import MockProvider from '../../integrationTests/Provider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { setupStore } from '../../store/store';
const mockedEvent = getHomeLiveEvents.events[0].Events[0];
const mockedEvent2 = getHomeLiveEvents2.events[0].Events[0];
/**Sample on how to use a mock context */
const renderProvider = (children: React.ReactNode) => {
  return render(<MockProvider>{children}</MockProvider>);
};
describe('EventOverview description', () => {
  it('Should render the participants of an event', () => {
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <BrowserRouter>
              <EventOverview data={mockedEvent} lock={mockedEvent.Locked} />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    const participants: Participants = {
      home: '',
      away: '',
    };
    mockedEvent.Participants.forEach((el: any) => {
      if (el.IsHome) {
        participants.home = el.LocalizedNames.LocalizedValues[0].Value;
      } else {
        participants.away = el.LocalizedNames.LocalizedValues[0].Value;
      }
    });
    expect(getByText(participants.home)).toBeInTheDocument();
    expect(getByText(participants.away)).toBeInTheDocument();
  });
  it('Should render period name of an event', () => {
    //TODO: check the diference for accesing the live time with diferent sports, for Example Basketball which displays .RemainingPeriodTime instead of .MatchTime
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <BrowserRouter>
              <EventOverview data={mockedEvent} lock={mockedEvent.Locked} />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    const periodName = mockedEvent.liveData.PeriodName;
    expect(getByText(periodName)).toBeInTheDocument();
  });
  it('Should render a locked icon when Locked propery is true and hide the market header and odds.', async () => {
    renderProvider(<EventOverview data={mockedEvent2} lock={mockedEvent2.Locked} />);
    expect(screen.getByText('Sagan Tosu')).toBeInTheDocument();
    expect(screen.queryByText('Más 6.5')).not.toBeInTheDocument();
    expect(screen.queryByText('Menos 6.5')).not.toBeInTheDocument();
    expect(screen.queryByText('2.4')).not.toBeInTheDocument();
    expect(screen.queryByText('1.5')).not.toBeInTheDocument();
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
});
