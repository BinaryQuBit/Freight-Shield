import React from 'react';
import { render } from '@testing-library/react';
import EmbeddedMap from '../EmbeddedMap';

describe('EmbeddedMap Component', () => {
  const mockProps = {
    pickUpLAT: 37.7749,
    pickUpLNG: -122.4194,
    dropOffLAT: 34.0522,
    dropOffLNG: -118.2437,
    driverLAT: 39.7392,
    driverLNG: -104.9903,
  };

  it('renders without crashing', () => {
    render(
      <EmbeddedMap
        pickUpLAT={mockProps.pickUpLAT}
        pickUpLNG={mockProps.pickUpLNG}
        dropOffLAT={mockProps.dropOffLAT}
        dropOffLNG={mockProps.dropOffLNG}
        driverLAT={mockProps.driverLAT}
        driverLNG={mockProps.driverLNG}
      />
    );
  });
});
