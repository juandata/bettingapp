import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from '../App';
import theme from '../styles/theme';
import { setupStore } from '../store/store';
import renderWithProviders from './Provider2';
import { reduceCodereData } from '../store/codereDataSlice';
import getHomeLiveEvents2 from '../data/getHomeLiveEvents2Mock.json';
import { reduceLiveDetailData } from '../store/liveDetailDataSlice';
import { liverpoolVSmontevideoNodeId, rentaTokudaVSRubinNodeId } from '../App';
import gamesLiveWithHomeLiveEventsMontevideo from '../data/gamesLiveWithHomeLiveEventsMontevideo.json';
import gamesLiveWithHomeLiveEventsMontevideo2 from '../data/gamesLiveWithHomeLiveEventsMontevideo2.json';
import getGamesLive2TokudaVsRubin from '../data/gamesLiveWithHomeLiveEvents2.json';
describe('Integration between AccordeonDataConverter and Coupon should work correctly', () => {
  beforeEach(() => {
    render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={setupStore()}>
            <App />
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    );
    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = screen.getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(screen.queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = screen.getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsSaganTosu = within(oddsOverviewArray[0]).getAllByRole('button');
    userEvent.click(oddsSaganTosu[0]);
    userEvent.click(oddsSaganTosu[1]);
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[0]);
  });
  it('Should render Futbol sport and Sagan Tosu vs Shonan Bellmare event', () => {
    expect(screen.getByText('Sagan Tosu')).toBeInTheDocument();
    expect(screen.getByText('Shonan Bellmare')).toBeInTheDocument();
    const buttonWithLoader = screen.getByTestId('button-with-loader');
    expect(buttonWithLoader).toBeDisabled();
  });
  it('When combined should enable the ButtonWithLoader component when a user adds more than 1 to the coupon-footer-text-input and disable it when there is an error message', async () => {
    const buttonWithLoader = screen.getByTestId('button-with-loader');
    const couponFooterTextInput = screen.getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    //user adds 10000 to the CouponFooter input
    userEvent.type(inputElement, '10000');
    expect(buttonWithLoader).toBeEnabled();
    expect(inputElement).toHaveValue('10,000');
    userEvent.type(inputElement, '{selectall} 0');
    expect(buttonWithLoader).toBeDisabled();
    expect(inputElement).toHaveValue('0');
    userEvent.type(inputElement, '{selectall} 1000');
    expect(buttonWithLoader).toBeEnabled();
    expect(inputElement).toHaveValue('1,000');
    userEvent.type(inputElement, '{selectall} 500000');
    expect(buttonWithLoader).toBeDisabled();
    expect(inputElement).toHaveValue('50,000');
  });
  it('When combined should calculate correctly more than 3 events combined, calculate correctly if one bet is deleted and clear all bets in coupon after clicked on Delete all button', async () => {
    const couponElement = screen.getByTestId('coupon');
    const couponFooterTextInput = screen.getByTestId('coupon-footer-text-input'); //failling
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    //user adds 10000 to the CouponFooter input
    userEvent.type(inputElement, '10000');
    expect(couponElement).toHaveTextContent('108,000');
    expect(couponElement).toHaveTextContent('10.80');
    const selectedBets = within(couponElement).getAllByTestId('selected-bet');
    const altonaMagicBet = selectedBets[2];
    const altonaMagicCloseIcon = within(altonaMagicBet).getByRole('button');
    userEvent.click(altonaMagicCloseIcon);
    const combinedQuoteNumber = /3.6/i;
    expect(screen.getByTestId('combined-quote')).toHaveTextContent(combinedQuoteNumber);
    userEvent.click(screen.getByText('Eliminar todo'));
    expect(within(couponElement).queryByText('Eliminar todo')).not.toBeInTheDocument();
    expect(within(couponElement).queryByText('108,000')).not.toBeInTheDocument();
    expect(within(couponElement).queryByText('10.80')).not.toBeInTheDocument();
    expect(couponElement).toHaveTextContent('Las selecciones serán añadidas');
  });
  it('When not combined should disable the Apostar button if the user has not added any value to the selected bets, should add selected-bet-text-input to each selected bet component which comes from betsDivided prop of couponFooter redux state and should disable coupon-footer-text-input', async () => {
    userEvent.click(screen.getByTestId('coupon-footer-switch'));
    const buttonWithLoader = screen.getByTestId('button-with-loader');
    expect(buttonWithLoader).toBeDisabled();
    const selectedBets = screen.getAllByTestId('selected-bet-text-input');
    expect(selectedBets).toHaveLength(3);
    const firstSelectedBetTextInput = within(selectedBets[0]).getByDisplayValue('');
    expect(firstSelectedBetTextInput).toHaveValue('');
    const secondSelectedBetTextInput = within(selectedBets[1]).getByDisplayValue('');
    expect(secondSelectedBetTextInput).toHaveValue('');
    const thirdSelectedBetTextInput = within(selectedBets[2]).getByDisplayValue('');
    expect(thirdSelectedBetTextInput).toHaveValue('');
    //coupon-footer-text-input should be disabled and have '' value as is not combined
    const couponFooterTextInput = screen.getByTestId('coupon-footer-text-input');
    const couponFooterTextInputValue = within(couponFooterTextInput).getByDisplayValue('0');
    expect(couponFooterTextInputValue).toHaveValue('0');
    expect(couponFooterTextInputValue).toBeDisabled();
  });
  it('When not combined should calculate correctly the bet earnings for every SelectedBet, update the coupon-footer-text-input with the total sum of every selected-bet-text-input and update values when user deletes one SelectedBet', async () => {
    userEvent.click(screen.getByTestId('coupon-footer-switch'));
    const couponFooterTextInput = screen.getByTestId('coupon-footer-text-input');
    const couponFooterTextInputValue = within(couponFooterTextInput).getByDisplayValue('0');
    expect(couponFooterTextInputValue).toHaveValue('0');
    const selectedBets = screen.getAllByTestId('selected-bet-text-input');
    const firstSelectedBetTextInput = within(selectedBets[0]).getByDisplayValue('');
    userEvent.type(firstSelectedBetTextInput, '1');
    const selectedBetEarnings = screen.getAllByTestId('selected-bet-earnings');
    expect(selectedBetEarnings[0]).toHaveTextContent('2.4');
    expect(couponFooterTextInputValue).toHaveValue('1');
    const secondSelectedBetTextInput = within(selectedBets[1]).getByDisplayValue('');
    userEvent.type(secondSelectedBetTextInput, '1');
    expect(selectedBetEarnings[1]).toHaveTextContent('1.5');
    expect(couponFooterTextInputValue).toHaveValue('2');
    const thirdSelectedBetTextInput = within(selectedBets[2]).getByDisplayValue('');
    userEvent.type(thirdSelectedBetTextInput, '1');
    expect(selectedBetEarnings[2]).toHaveTextContent('3');
    expect(couponFooterTextInputValue).toHaveValue('3');
    const maxEarning = screen.getByTestId('max-earning');
    expect(maxEarning).toHaveTextContent('6.9');
    const selectedBetCloseIcons = screen.getAllByTestId('selected-bet-close-icon');
    userEvent.click(selectedBetCloseIcons[2]);
    const selectedBetsAfterDeleteBet = screen.getAllByTestId('selected-bet-text-input');
    expect(selectedBetsAfterDeleteBet).toHaveLength(2);
    const maxEarningAfterDeletedBet = screen.getByTestId('max-earning');
    expect(maxEarningAfterDeletedBet).toHaveTextContent('3.9');
    expect(couponFooterTextInputValue).toHaveValue('2');
  });
});

describe('Integration between AccordeonDataConverter and Coupon should work correctly with comming data', () => {
  it('Should disable the bet button when locks props come from server', async () => {
    const { queryByTestId, getByText, queryByText, getByTestId, findByTestId, store } = renderWithProviders(<App />);
    const coupon = getByTestId('coupon');
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsSaganTosu = within(oddsOverviewArray[0]).getAllByRole('button');
    userEvent.click(oddsSaganTosu[0]);
    userEvent.click(oddsSaganTosu[1]);
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[0]);
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    const buttonWithLoader = getByTestId('button-with-loader');
    expect(buttonWithLoader).toBeEnabled();
    act(() => {
      store.dispatch(reduceCodereData(getHomeLiveEvents2));
    });
    const buttonWithLoader2 = await findByTestId('button-with-loader');
    expect(buttonWithLoader2).toBeDisabled();
    const lockIcons = within(coupon).getAllByTestId('lock-icon');
    expect(lockIcons).toHaveLength(3);
  });
  it('Should reject a bet when the a lock property comes from server', async () => {
    const { queryByTestId, getByText, queryByText, getByTestId, findByTestId, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsSaganTosu = within(oddsOverviewArray[0]).getAllByRole('button');
    userEvent.click(oddsSaganTosu[0]);
    userEvent.click(oddsSaganTosu[1]);
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[0]);

    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    const buttonWithLoader = getByTestId('button-with-loader');
    userEvent.click(buttonWithLoader);
    act(() => {
      store.dispatch(reduceCodereData(getHomeLiveEvents2));
    });
    const alertReject = await findByTestId('reject-bet');
    expect(alertReject).toBeInTheDocument();
  });
  it('Should accept a bet when the odd does not change', async () => {
    const { queryByTestId, getByText, queryByText, getByTestId, findByTestId, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[4]);
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    const buttonWithLoader = getByTestId('button-with-loader');
    userEvent.click(buttonWithLoader);
    act(() => {
      store.dispatch(reduceCodereData(getHomeLiveEvents2));
    });
    const alertSuccess = await findByTestId('accept-bet');
    expect(alertSuccess).toBeInTheDocument();
  });
  it('Should accept a bet when the odd increases', async () => {
    const { queryByTestId, getByText, queryByText, getAllByText, getByTestId, findByTestId, store } =
      renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsSaganTosu = within(oddsOverviewArray[0]).getAllByRole('button');
    userEvent.click(oddsSaganTosu[0]);
    userEvent.click(oddsSaganTosu[1]);
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[0]);

    userEvent.click(getByText('Eliminar todo'));
    userEvent.click(getAllByText('2.75')[0]);
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    const buttonWithLoader = getByTestId('button-with-loader');
    userEvent.click(buttonWithLoader);
    act(() => {
      store.dispatch(reduceCodereData(getHomeLiveEvents2));
    });
    const alertSuccess = await findByTestId('accept-bet');
    expect(alertSuccess).toBeInTheDocument();
  });
  it('Should reject a bet when the odd decreases', async () => {
    const { queryByTestId, getByText, queryByText, getByTestId, findByTestId, store } = renderWithProviders(<App />);
    const loader = queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    expect(loader).not.toBeInTheDocument();
    expect(queryByText('Welcome Page')).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsSaganTosu = within(oddsOverviewArray[0]).getAllByRole('button');
    userEvent.click(oddsSaganTosu[0]);
    userEvent.click(oddsSaganTosu[1]);
    const oddsAltona = within(oddsOverviewArray[1]).getAllByRole('button');
    userEvent.click(oddsAltona[0]);
    userEvent.click(getByText('Eliminar todo'));
    const oddsOverviewArray2 = screen.getAllByTestId('odds-overview');
    const oddsAltona2 = within(oddsOverviewArray2[1]).getAllByRole('button');
    userEvent.click(oddsAltona2[2]);
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    const buttonWithLoader = getByTestId('button-with-loader');
    userEvent.click(buttonWithLoader);
    act(() => {
      store.dispatch(reduceCodereData(getHomeLiveEvents2));
    });
    const alertReject = await findByTestId('reject-bet');
    expect(alertReject).toBeInTheDocument();
  });
  it('Should show the lock property and reject a bet when liveDetail is in coupon ', async () => {
    const { queryByTestId, getByText, getByTestId, findByTestId, store } = renderWithProviders(<App />);
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsLiverpoolVSclubMoreMarketsButton = within(oddsOverviewArray[3]).getByTestId('more-live-markets');
    userEvent.click(oddsLiverpoolVSclubMoreMarketsButton);
    expect(getByText('PRINCIPALES')).toBeInTheDocument();
    expect(getByText('GOLES')).toBeInTheDocument();
    expect(getByText('EQUIPOS')).toBeInTheDocument();
    const oddsOverviewArrayLiveDetailView = screen.getAllByTestId('odds-overview');
    const oddsWinTheRestOfTheMatch = within(oddsOverviewArrayLiveDetailView[0]).getAllByRole('button');
    userEvent.click(oddsWinTheRestOfTheMatch[0]);
    const coupon = getByTestId('coupon');
    expect(coupon).toHaveTextContent('Liverpool Montevideo');
    expect(coupon).toHaveTextContent('14');
    expect(coupon).toHaveTextContent('Ganar el Resto del Partido (Marcador 3:0)');
    expect(coupon).toHaveTextContent('Liverpool Montevideo - Nacional (URU)');
    const buttonWithLoader = getByTestId('button-with-loader');
    expect(buttonWithLoader).toBeDisabled();
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    expect(coupon).toHaveTextContent('Ganancia total:');
    expect(coupon).toHaveTextContent('140,000');
    expect(buttonWithLoader).toBeEnabled();
    //dispatch new liveDetail data with lock property on it
    act(() => {
      store.dispatch(reduceLiveDetailData({ [liverpoolVSmontevideoNodeId]: gamesLiveWithHomeLiveEventsMontevideo2 }));
    });
    expect(buttonWithLoader).toBeDisabled();
    act(() => {
      store.dispatch(reduceLiveDetailData({ [liverpoolVSmontevideoNodeId]: gamesLiveWithHomeLiveEventsMontevideo }));
    });
    expect(buttonWithLoader).toBeEnabled();
    userEvent.click(buttonWithLoader);
    const loader = queryByTestId('loader');
    expect(loader).toBeInTheDocument();
    act(() => {
      store.dispatch(reduceLiveDetailData({ [liverpoolVSmontevideoNodeId]: gamesLiveWithHomeLiveEventsMontevideo2 }));
    });
    // screen.debug(coupon, Infinity);
    const alertReject = await findByTestId('reject-bet');
    expect(alertReject).toBeInTheDocument();
  });
  it('Should wait for all liveDetail dependencies bets located in coupon get updated before acepting or rejecting a bet ', async () => {
    const { getByText, getByTestId, findByTestId, getAllByText, store } = renderWithProviders(<App />);
    const liveTab = getByText('En vivo');
    userEvent.click(liveTab);
    const soccerTab = getByText('Fútbol');
    userEvent.click(soccerTab);
    const oddsOverviewArray = screen.getAllByTestId('odds-overview');
    const oddsLiverpoolVSclubMoreMarketsButton = within(oddsOverviewArray[3]).getByTestId('more-live-markets');
    userEvent.click(oddsLiverpoolVSclubMoreMarketsButton);
    expect(getByText('PRINCIPALES')).toBeInTheDocument();
    expect(getByText('GOLES')).toBeInTheDocument();
    expect(getByText('EQUIPOS')).toBeInTheDocument();
    const oddsOverviewArrayLiveDetailView = screen.getAllByTestId('odds-overview');
    const oddsWinTheRestOfTheMatch = within(oddsOverviewArrayLiveDetailView[0]).getAllByRole('button');
    userEvent.click(oddsWinTheRestOfTheMatch[1]);
    const coupon = getByTestId('coupon');
    expect(coupon).toHaveTextContent('Liverpool Montevideo');
    expect(coupon).toHaveTextContent('1.04');
    expect(coupon).toHaveTextContent('Ganar el Resto del Partido (Marcador 3:0)');
    expect(coupon).toHaveTextContent('Liverpool Montevideo - Nacional (URU)');
    const buttonWithLoader = getByTestId('button-with-loader');
    expect(buttonWithLoader).toBeDisabled();
    const couponFooterTextInput = getByTestId('coupon-footer-text-input');
    const inputElement = within(couponFooterTextInput).getByDisplayValue('');
    userEvent.type(inputElement, '10000');
    expect(coupon).toHaveTextContent('Ganancia total:');
    expect(coupon).toHaveTextContent('10,400');
    expect(buttonWithLoader).toBeEnabled();
    //come back to enVivo view
    userEvent.click(liveTab);
    const tennisTab = getByText('Tenis');
    userEvent.click(tennisTab);
    expect(getAllByText('Renta Tokuda').length).toBeGreaterThan(1);
    const oddsOverviewArray2 = screen.getAllByTestId('odds-overview');
    const oddsRentaVSrubinButton = within(oddsOverviewArray2[0]).getByTestId('more-live-markets');
    userEvent.click(oddsRentaVSrubinButton);
    expect(getByText('PRINCIPALES')).toBeInTheDocument();
    expect(getByText('JUEGOS')).toBeInTheDocument();
    expect(getByText('SETS')).toBeInTheDocument();
    const oddsOverviewArrayLiveDetailViewRentaVSrubin = screen.getAllByTestId('odds-overview');
    const oddsThereWillBe40EqualsInTheGame5ofSet2 = within(oddsOverviewArrayLiveDetailViewRentaVSrubin[0]).getAllByRole(
      'button'
    );
    userEvent.click(oddsThereWillBe40EqualsInTheGame5ofSet2[0]);
    expect(coupon).toHaveTextContent('Si');
    expect(coupon).toHaveTextContent('3.2');
    expect(coupon).toHaveTextContent('¿Habrá un 40 iguales en el Juego 5 del Set 2?');
    expect(coupon).toHaveTextContent('Renta Tokuda - Rubin Statham');
    expect(coupon).toHaveTextContent('Cuota combinada:');
    expect(coupon).toHaveTextContent('3.33');
    expect(coupon).toHaveTextContent('Ganancia total:');
    expect(coupon).toHaveTextContent('33,280');
    const buttonWithLoader2 = getByTestId('button-with-loader');
    expect(buttonWithLoader2).toBeEnabled();
    userEvent.click(buttonWithLoader2);
    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
    //dispatch new liveDetail data with higher odd: 1.09
    act(() => {
      store.dispatch(reduceLiveDetailData({ [liverpoolVSmontevideoNodeId]: gamesLiveWithHomeLiveEventsMontevideo2 }));
    });
    //screen.debug(coupon, Infinity);
    expect(coupon).toHaveTextContent('1.09'); //const loader2 = getByTestId('loader'); is not working despite it is in the view, so check if the odd have changed.

    //dispatch new liveDetail data with the same odd
    act(() => {
      store.dispatch(reduceLiveDetailData({ [rentaTokudaVSRubinNodeId]: getGamesLive2TokudaVsRubin }));
    });
    const alertSuccess = await findByTestId('accept-bet');
    expect(alertSuccess).toBeInTheDocument();
    /**
     * TODO:It renders the coupon view without accepting the bet so WHY IS PASSING THE TEST???
     */
    // screen.debug(coupon, Infinity);
  });
});
