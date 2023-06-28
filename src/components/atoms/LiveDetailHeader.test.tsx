import React from 'react';
import { render, screen } from '@testing-library/react';
import LiveDetailHeader from './LiveDetailHeader';
import { liveDetailDataSlice } from '../../mockData';

describe('Displays the LiveDetailHeader when no statistics are available from data source', () => {
  it('Should render correctly the information from the data source when sport is not soccer', () => {
    render(<LiveDetailHeader data={liveDetailDataSlice[6744932314]} />);
    expect(screen.getByText('Renta Tokuda')).toBeInTheDocument();
    expect(screen.getByText('Rubin Statham')).toBeInTheDocument();
    expect(screen.getByText('2º Set')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('06:33')).toBeInTheDocument();
    expect(screen.getByTestId('Start')).toBeInTheDocument();
    expect(screen.getByTestId('Sport')).toBeInTheDocument();
    expect(screen.getByTestId('League')).toBeInTheDocument();
    expect(screen.getByTestId('Country')).toBeInTheDocument();
    expect(screen.getByText('7/5/2023 11:33:00 p. m.')).toBeInTheDocument();
    expect(screen.getByText('Tenis')).toBeInTheDocument();
    expect(screen.getByText('ATP Challenger Busan - Clasificación')).toBeInTheDocument();
    expect(screen.getByText('ATP Challenger Clasificación')).toBeInTheDocument();
  });

  it('Should render correctly the information from the data source when sport is soccer', () => {
    render(<LiveDetailHeader data={liveDetailDataSlice[6760114061]} />);
    expect(screen.getAllByText('Sagan Tosu')).toHaveLength(2);
    expect(screen.getAllByText('Shonan Bellmare')).toHaveLength(2);
    expect(screen.getByText('2º Tiempo')).toBeInTheDocument();
    expect(screen.getByText('83')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('18/2/2023 1:00:00 a. m.')).toBeInTheDocument();
    expect(screen.getByTestId('Start')).toBeInTheDocument();
    expect(screen.getByTestId('Sport')).toBeInTheDocument();
    expect(screen.getByTestId('League')).toBeInTheDocument();
    expect(screen.getByTestId('Country')).toBeInTheDocument();
    expect(screen.getByText('18/2/2023 1:00:00 a. m.')).toBeInTheDocument();
    expect(screen.getByText('Fútbol')).toBeInTheDocument();
    expect(screen.getByText('J1 League')).toBeInTheDocument();
    expect(screen.getByText('Japón')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(4);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getAllByTestId('yellow-card')).toHaveLength(2);
    expect(screen.getAllByTestId('red-card')).toHaveLength(2);
  });
});
