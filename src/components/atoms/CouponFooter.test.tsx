import React from 'react';
import { render } from '@testing-library/react';
import MockProvider from '../../integrationTests/Provider';
import CouponFooter from './CouponFooter';

/**Sample on how to use a mock context */
const renderProvider = (children: React.ReactNode) => {
  return render(<MockProvider>{children} </MockProvider>);
};

describe('Displays the CouponFooter which allows the user to interact with the Coupon', () => {
  it('Should render correctly the initial state of the CouponFooter', () => {
    const { queryByTestId, getByPlaceholderText } = renderProvider(<CouponFooter />);
    expect(queryByTestId('button-with-loader')).toBe(null);
    const couponFooter = getByPlaceholderText('Cantidad a apostar en USD');
    expect(couponFooter).toHaveValue('');
  });
});
