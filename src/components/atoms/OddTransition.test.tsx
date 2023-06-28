import React from 'react';
import { render } from '@testing-library/react';
import OddsTransition from './OddTransition';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
const events = getHomeLiveEvents.events[0].Events;

describe('Renders the Odd of the market', () => {
  it('Should render the odd of an event.', () => {
    const results = events[0].Games[0].Results[0];
    const { getByText } = render(
      <OddsTransition showOdd={true} odd={+results.Odd} clicked={false} nodeId={events[0].Games[0].Results[0].NodeId} />
    );
    expect(getByText(results.Odd)).toBeInTheDocument();
  });
});
