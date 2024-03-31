import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MoreDetails from '../moreDetailsCarriers'


describe('MoreDetails', () => {
  const carrier = {
    firstName: 'Raman',
    lastName: 'singh',
  };

  test('renders modal with carrier details', () => {
    render(
      <MoreDetails isOpen={true} onClose={() => {}} carrier={carrier} />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Raman/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/singh/i)).toBeInTheDocument();
    expect(screen.getByText(/Address:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Phone Number:/i)).toBeInTheDocument(); 
    
    fireEvent.click(screen.getByText('Close'));

  });

  test('closes modal when Close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(
      <MoreDetails isOpen={true} onClose={onCloseMock} carrier={carrier} />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
