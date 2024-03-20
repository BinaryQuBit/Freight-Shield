// Auto Complete Places

import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GooglePlacesAutocomplete = ({ type, name, placeholder, value, onChange, borderColor, id }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const initializeAutocomplete = (autocompleteId) => {
        if (!window.google) {
          console.error('Google Maps JavaScript API not loaded');
          return;
        }

        const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById(autocompleteId),
          { types: ['address'], componentRestrictions: { country: ['CA'] } }
        );

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          let city = '';
          for (const component of place.address_components) {
            if (component.types.includes('locality')) {
              city = component.long_name;
              break;
            }
          }

          onChange({ 
            address: place.formatted_address, 
            city, 
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            id: autocompleteId 
          });
        });
      };

      initializeAutocomplete(id);
    }
  }, [isLoaded, id, onChange]);

  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      borderColor={borderColor}
      id={id}
      rounded={"none"}
    />
  );
};

export default GooglePlacesAutocomplete;

