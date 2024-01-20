import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const calgary = {
  lat: 51.0447,
  lng: -114.0719
};

const vancouver = {
  lat: 49.2827,
  lng: -123.1207
};

const center = {
  lat: (calgary.lat + vancouver.lat) / 2,
  lng: (calgary.lng + vancouver.lng) / 2
};

const mapStyles = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#444444"}]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"color": "#f2f2f2"}]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{"saturation": -100},{"lightness": 45}]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{"visibility": "simplified"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{"color": "#46bcec"},{"visibility": "on"}]
  }
];

function EmbeddedMap() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey
  });

  const onLoad = map => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(calgary.lat, calgary.lng));
    bounds.extend(new window.google.maps.LatLng(vancouver.lat, vancouver.lng));
    map.fitBounds(bounds);
  };

  const mapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    draggable: false,
    keyboardShortcuts: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: mapStyles
  };

  

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      options={mapOptions}
    >
      <Marker position={calgary} />
      <Marker position={vancouver} />
    </GoogleMap>
  );
}

export default React.memo(EmbeddedMap);


// function MapComponent({ load }) {
//     const mapCenter = {
//       lat: parseFloat(load?.latitude || center.lat),
//       lng: parseFloat(load?.longitude || center.lng)
//     };

