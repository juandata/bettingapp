import React from 'react';
import { act, screen, within } from '@testing-library/react';
import AccordeonDataConverter from './AccordeonDataConverter';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
import renderWithProviders from '../../integrationTests/Provider2';
import userEvent from '@testing-library/user-event';
import { codereDataSlice } from '../../mockData';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { reduceUserActions } from '../../store/userActionsSlice';

import { userActions } from '../../store/initialState';
const events = getHomeLiveEvents.events[0];
//const events2 = getHomeLiveEvents2.events[0];
/**Sample on how to use a mock context */

describe('Transforms data from coderes endpoint, it displays the markets for a sportHandle', () => {
  it('Should render the information of a sportHandle.', () => {
    const { getByText, queryAllByText } = renderWithProviders(
      <BrowserRouter>
        <AccordeonDataConverter data={events} />
      </BrowserRouter>,
      {
        preloadedState: {
          codereData: codereDataSlice,
        },
      }
    );
    expect(getByText('Fútbol')).toBeInTheDocument();
    userEvent.click(screen.getByText('Fútbol'));
    expect(getByText('Sagan Tosu')).toBeInTheDocument();
    expect(getByText('Shonan Bellmare')).toBeInTheDocument();
    expect(queryAllByText('2º Tiempo')[0]).toBeInTheDocument();
    expect(getByText('83')).toBeInTheDocument();
    expect(queryAllByText('1')[0]).toBeInTheDocument();
    expect(queryAllByText('5')[0]).toBeInTheDocument();
    expect(getByText('Más 6.5')).toBeInTheDocument();
    expect(getByText('Menos 6.5')).toBeInTheDocument();
    expect(queryAllByText('2.4')[0]).toBeInTheDocument();
    expect(queryAllByText('1.5')[0]).toBeInTheDocument();
    expect(getByText('Zhetysu Taldykorgan')).toBeInTheDocument();
    expect(getByText('FC Astana')).toBeInTheDocument();
    expect(queryAllByText('1º Tiempo')[0]).toBeInTheDocument();
    expect(getByText('17')).toBeInTheDocument();
    expect(queryAllByText('0')[0]).toBeInTheDocument();
    expect(queryAllByText('0')[0]).toBeInTheDocument();
    expect(queryAllByText('X')[0]).toBeInTheDocument();
  });
  it('Should render the lock icons when Locked value from data is true', async () => {
    const { findByText, getByText, getAllByTestId } = renderWithProviders(
      <BrowserRouter>
        <AccordeonDataConverter data={events} />
      </BrowserRouter>,
      {
        preloadedState: {
          codereData: codereDataSlice,
        },
      }
    );
    userEvent.click(getByText('Fútbol'));
    const saganTosu = await findByText('Sagan Tosu');
    expect(saganTosu).toBeInTheDocument();
    const lockIcons = getAllByTestId('lock-icon');
    expect(lockIcons.length).toBeGreaterThan(1);
  });
  it('Should display the connection error message when server is down or the client internet connection failed.', async () => {
    const { queryByTestId, getByText, findByText, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerText = await findByText('Fútbol');
    expect(soccerText).toBeInTheDocument();
    const userActionsCopy = { ...userActions };
    userActionsCopy.connectionError =
      'adrebet.com: Por favor revisa la conexión a internet. El servidor está desconectado.';
    store.dispatch(reduceUserActions(userActionsCopy));
    screen.debug(undefined, Infinity);
    const errorMessage = await findByText(
      'adrebet.com: Por favor revisa la conexión a internet. El servidor está desconectado.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('Should display the error message with warning for getHomeLiveEvents 10 times before showing it with error severity and button click option.', async () => {
    const { queryByTestId, findByTestId, getByText, findByText, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerText = await findByText('Fútbol');
    expect(soccerText).toBeInTheDocument();
    const userActionsCopy = { ...userActions };
    const getHomeLiveEventsErrorMessage =
      'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.';

    userActionsCopy.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy));
    });
    const loader2 = await findByTestId('loader');
    expect(loader2).toBeInTheDocument();
    const errorMessage = await findByText(getHomeLiveEventsErrorMessage);
    expect(errorMessage).toBeInTheDocument();
    const userActionsCopy2 = { ...userActions };
    userActionsCopy2.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy2));
    });
    const userActionsCopy3 = { ...userActions };
    userActionsCopy3.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy3));
    });
    const userActionsCopy4 = { ...userActions };
    userActionsCopy4.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy4));
    });
    const userActionsCopy5 = { ...userActions };
    userActionsCopy5.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy5));
    });
    const userActionsCopy6 = { ...userActions };
    userActionsCopy6.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy6));
    });
    const userActionsCopy7 = { ...userActions };
    userActionsCopy7.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy7));
    });
    const userActionsCopy8 = { ...userActions };
    userActionsCopy8.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy8));
    });
    const userActionsCopy9 = { ...userActions };
    userActionsCopy9.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy9));
    });
    const userActionsCopy10 = { ...userActions };
    userActionsCopy10.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy10));
    });
    const userActionsCopy11 = { ...userActions };
    userActionsCopy11.connectionError = getHomeLiveEventsErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy11));
    });
    const errorMessage2 = await findByText(
      'adrebet.com: Los mercados en vivo no están disponibles, lo invitamos a probar con otros mercados.'
    );
    expect(errorMessage2).toBeInTheDocument();
  });
  it('Should display the error message with warning for getGamesLive 10 times before showing it with error severity and button click option.', async () => {
    const { queryByTestId, findByTestId, getByText, findByText, getAllByTestId, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerTab = await findByText('Fútbol');
    expect(soccerTab).toBeInTheDocument();
    userEvent.click(soccerTab);
    const oddsOverviewArray = getAllByTestId('odds-overview');
    const moreLiveMarketsSaganTosu = within(oddsOverviewArray[0]).getByTestId('more-live-markets');
    userEvent.click(moreLiveMarketsSaganTosu);
    const loader2 = await findByTestId('loader');
    expect(loader2).toBeInTheDocument();
    const userActionsCopy = { ...userActions };
    const parentNodeId = '6649152292';
    userActionsCopy.lastLiveDetailId = parentNodeId;
    userActionsCopy.roomToDelete = parentNodeId;
    const getGamesLiveErrorMessage = 'adrebet.com: El mercado actual no está disponible, por favor espere un momento.';
    userActionsCopy.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy));
    });
    const loader3 = await findByTestId('loader');
    expect(loader3).toBeInTheDocument();
    const errorMessage = await findByText(getGamesLiveErrorMessage);
    expect(errorMessage).toBeInTheDocument();
    const userActionsCopy2 = { ...userActionsCopy };
    userActionsCopy2.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy2));
    });
    const userActionsCopy3 = { ...userActionsCopy };
    userActionsCopy3.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy3));
    });
    const userActionsCopy4 = { ...userActionsCopy };
    userActionsCopy4.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy4));
    });
    const userActionsCopy5 = { ...userActionsCopy };
    userActionsCopy5.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy5));
    });
    const userActionsCopy6 = { ...userActionsCopy };
    userActionsCopy6.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy6));
    });
    const userActionsCopy7 = { ...userActionsCopy };
    userActionsCopy7.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy7));
    });
    const userActionsCopy8 = { ...userActionsCopy };
    userActionsCopy8.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy8));
    });
    const userActionsCopy9 = { ...userActionsCopy };
    userActionsCopy9.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy9));
    });
    const userActionsCopy10 = { ...userActionsCopy };
    userActionsCopy10.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy10));
    });
    const userActionsCopy11 = { ...userActionsCopy };
    userActionsCopy11.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy11));
    });
    const errorMessage2 = await findByText(
      'adrebet.com: El mercado actual no está disponible, lo invitamos a probar con otros mercados.'
    );
    expect(errorMessage2).toBeInTheDocument();
  });
  it('Should display the error message with warning for getGamesLive for 3 times before reinitializing the error (when data recovers from server).', async () => {
    const { queryByTestId, findByTestId, getByText, findByText, getAllByTestId, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerTab = await findByText('Fútbol');
    expect(soccerTab).toBeInTheDocument();
    userEvent.click(soccerTab);
    const oddsOverviewArray = getAllByTestId('odds-overview');
    const moreLiveMarketsSaganTosu = within(oddsOverviewArray[0]).getByTestId('more-live-markets');
    userEvent.click(moreLiveMarketsSaganTosu);
    const loader2 = await findByTestId('loader');
    expect(loader2).toBeInTheDocument();
    const userActionsCopy = { ...userActions };
    const parentNodeId = '6649152292';
    userActionsCopy.lastLiveDetailId = parentNodeId;
    userActionsCopy.roomToDelete = parentNodeId;
    const getGamesLiveErrorMessage = 'adrebet.com: El mercado actual no está disponible, por favor espere un momento.';
    userActionsCopy.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy));
    });
    const loader3 = await findByTestId('loader');
    expect(loader3).toBeInTheDocument();
    const errorMessage = await findByText(getGamesLiveErrorMessage);
    expect(errorMessage).toBeInTheDocument();
    const userActionsCopy2 = { ...userActionsCopy };
    userActionsCopy2.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy2));
    });
    const userActionsCopy3 = { ...userActionsCopy };
    userActionsCopy3.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy3));
    });
    const userActionsCopy4 = { ...userActionsCopy };
    userActionsCopy4.connectionError = getGamesLiveErrorMessage;
    act(() => {
      store.dispatch(reduceUserActions(userActionsCopy4));
    });
    const userActionsCopy5 = { ...userActionsCopy };
    userActionsCopy5.connectionError = getGamesLiveErrorMessage;
    /**
     * TODO:
     * Find out how to check if liveDetailMarketErrorCounter is not equal to 0, if so there was an error from response but the data recovered from server
     * currently using an alert to test if this works!
     */
  });
});
