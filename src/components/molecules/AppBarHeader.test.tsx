import React from 'react';
import { render } from '@testing-library/react';
import AppBarHeader from './AppBarHeader';

describe('Displays the AppBarHeader', () => {
  it('Should render the information of the AppBarHeader correctly.', () => {
    const { getByText } = render(<AppBarHeader />);
    expect(getByText('adrebet.com')).toBeInTheDocument();
    expect(getByText('Perfil')).toBeInTheDocument();
    expect(getByText('Mi cuenta')).toBeInTheDocument();
  });
});
