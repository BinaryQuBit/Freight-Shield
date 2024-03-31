
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MoreDetails from '../moreDetailsShippers';

describe('MoreDetails', () => {
  const shipper = {
    firstName: 'Raman',
    lastName: 'singh',
    companyPhoneNumber: '123-456-7890',
    streetAddress: '1111 wascana street',
    city: 'Anytown',
    province: 'Province',
    postalCode: '12345',
    country: 'Country',
    businessName: 'Aman company',
    businessNumber: '123456789',
    website: 'http://www.example.com',
  };

  test('renders modal with shipper details', () => {
    render(
      <MoreDetails isOpen={true} onClose={() => {}} shipper={shipper} />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Raman/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/singh/i)).toBeInTheDocument();
    expect(screen.getByText(/Address:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Phone Number:/i)).toBeInTheDocument(); 
    expect(
      screen.getByText(
        /1111 wascana street/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Business Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Aman Company/i)).toBeInTheDocument();
    expect(
      screen.getByText(/123456789/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/http:\/\/www.example.com/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
  });

  test('closes modal when Close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(
      <MoreDetails isOpen={true} onClose={onCloseMock} shipper={shipper} />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
