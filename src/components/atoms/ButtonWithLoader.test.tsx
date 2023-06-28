import React from 'react';
import { render } from '@testing-library/react';
import ButtonWithLoader from './ButtonWithLoader';
import getGamesLive from '../../data/gamesLiveWithHomeLiveEvents.json';
import { userDataState, couponState, codereDataState, userActions, couponFooterState } from '../../store/initialState';
import MockProvider from '../../integrationTests/Provider';
/**Sample on how to use a mock context */
const renderProvider = (children: React.ReactNode) => {
  return render(<MockProvider>{children} </MockProvider>);
};
const liveDetailState = {
  '7219795979': getGamesLive,
};
describe('Display the bet button', () => {
  it('Should render a disable bet button.', async () => {
    /**TODO:
     * The button is not disable because the initial state is enable and it changes after the user
     * has added bets to the coupon, so it is necesary to mock the couponState and couponFooterState
     * and assert on those states
     */
    const mockState = {
      userState: userDataState,
      couponState,
      userActionsState: userActions,
      codereDataState,
      couponFooterState,
      liveDetailState,
    };
    const { findByTestId } = renderProvider(<ButtonWithLoader text="Apostar" />);

    const buttonWithLoader = await findByTestId('button-with-loader');
    expect(buttonWithLoader).toBeInTheDocument();
    expect(buttonWithLoader).not.toBeDisabled(); //initial state is not disable because if so it triggers a change in state that is perveived by the user when first bet is added
  });
});
