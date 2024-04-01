import React from 'react';
import { render } from '@testing-library/react';
import DistanceCalculator from '../DistanceCalculator';

describe('DistanceCalculator Component', () => {
  it('renders without crashing', () => {
    render(<DistanceCalculator />);
  });
});
