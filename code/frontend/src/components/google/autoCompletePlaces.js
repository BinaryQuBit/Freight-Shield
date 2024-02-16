
import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { useLoadScript } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_API_KEY;
const GooglePlacesAutocomplete = ({ type, name, placeholder, value, onChange, borderColor, id }) => {
  
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

    const modalContent = document.querySelector('.modal-content');

    document.getElementById(autocompleteId).addEventListener('focus', () => {
      const pacContainer = document.querySelector('.pac-container');
      if (modalContent && pacContainer) {
        modalContent.appendChild(pacContainer);
        pacContainer.style.position = 'absolute';
      }
    });
    
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(autocompleteId),
        { types: ['address'], componentRestrictions: { country: ['CA'] } }
      );
    
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
    
        let city = '';
        for (const component of place.address_components) {
          if (component.types.includes('locality')) {
            city = component.long_name;
            break;
          }
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
    
        if (city) {
          onChange({ 
            address: place.formatted_address, 
            city: city, 
            lat: lat,
            lng: lng,
            id: autocompleteId 
          });
        } else {
          console.log("City not found in the address");
        }
      });
  };
    
  
    if (isLoaded) {
      initializeAutocomplete(id);
    }
  }, [isLoaded, id, onChange]);
  

  return (
    <Input
      type = {type}
      name = {name}
      placeholder = {placeholder}
      value = {value}
      onChange = {onChange}
      borderColor = {borderColor}
      id = {id}
      rounded={"no"}
    />
  );
};

export default GooglePlacesAutocomplete;
