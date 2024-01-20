import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { useLoadScript } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_API_KEY;
const GooglePlacesAutocomplete = ({ id, ml, mr, placeholder }) => {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  useEffect(() => {
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
        console.log(place);
      });
    };

    if (isLoaded) {
      initializeAutocomplete(id);
    }
  }, [isLoaded, id]);

  return (
    <Input
      id={id}
      type="text"
      ml={ml}
      mr={mr}
      placeholder={placeholder}
    />
  );
};

export default GooglePlacesAutocomplete;
