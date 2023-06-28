import React from 'react';
import BetsMade from './BetsMade';
import renderWithProviders from '../../integrationTests/Provider2';
import userEvent from '@testing-library/user-event';
import { userDataSlice } from '../../mockData';
//import getHomeLiveEvents from '../data/getHomeLiveEvents.json';
//const mockedEvent = getHomeLiveEvents.events[0].Events[0];

//Sample on how to use a mock context
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

describe('Renders the BetsMade component', () => {
  it('Should render a bet made by the user correctly and hide the information when click on tab', async () => {
    const { getByText } = renderWithProviders(<BetsMade />, {
      preloadedState: {
        userData: userDataSlice,
      },
    });
    const id = getByText('9f996fbf81e9');
    const betParticipants = getByText('Altona Magic SC - Hume City');
    expect(id).toBeInTheDocument();
    expect(betParticipants).toBeInTheDocument();
    userEvent.click(id);
    await new Promise((r) => setTimeout(r, 3000));
    expect(betParticipants).not.toBeInTheDocument();
  }, 5000);
});
