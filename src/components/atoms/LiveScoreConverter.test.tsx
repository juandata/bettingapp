import React from 'react';
import { render } from '@testing-library/react';
import LiveScoreConverter from './LiveScoreConverter';
import getHomeLiveEvents from '../../data/getHomeLiveEvents.json';
const mockedEvent = getHomeLiveEvents.LiveSport[0].Events[0];
describe('Converts the live score depending on the sport', () => {
  it('Should render the correct live score for the local participant of the event', () => {
    const resultHome = mockedEvent.liveData.ResultHome;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { getByText } = render(<LiveScoreConverter data={mockedEvent.liveData} result={resultHome} home={true} />);
    expect(getByText(resultHome)).toBeInTheDocument();
  });
  it('Should render the correct live score for the visitor participant of the event', () => {
    const resultAway = mockedEvent.liveData.ResultAway;
    const { getByText } = render(<LiveScoreConverter data={mockedEvent.liveData} result={resultAway} home={false} />);
    expect(getByText(resultAway)).toBeInTheDocument();
  });
});
