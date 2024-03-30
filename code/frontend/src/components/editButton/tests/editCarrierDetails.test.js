import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditCarrierDetails from '../EditCarrierDetails';

describe('EditCarrierDetails Component', () => {
  const mockData = {
    firstName: 'Amandeep',
    lastName: 'Singh',
    companyPhoneNumber: '1234567890',
  };

  test('renders without crashing', () => {
    render(<EditCarrierDetails isOpen={true} onClose={() => {}} data={mockData} />);
  });

  test('displays input fields with provided data', () => {
    render(<EditCarrierDetails isOpen={true} onClose={() => {}} data={mockData} />);

    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Amandeep');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Singh');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('1234567890');
  });

  test('calls onClose callback when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<EditCarrierDetails isOpen={true} onClose={onCloseMock} data={mockData} />);

    fireEvent.click(screen.getByText(/Close/i));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
