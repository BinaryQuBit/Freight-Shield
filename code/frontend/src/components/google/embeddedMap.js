// Embedded Maps

/* global google */
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

// Reuse the same libraries array if needed
const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapStyles = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#444444" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#46bcec" }, { visibility: "on" }],
  },
];

function EmbeddedMap({
  pickUpLAT,
  pickUpLNG,
  dropOffLAT,
  dropOffLNG,
  driverLAT,
  driverLNG,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [driverPosition, setDriverPosition] = useState({
    lat: driverLAT,
    lng: driverLNG,
  });

  useEffect(() => {
    if (isLoaded && !loadError && typeof google !== "undefined") {
      const fetchDirections = () => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: { lat: pickUpLAT, lng: pickUpLNG },
            destination: { lat: dropOffLAT, lng: dropOffLNG },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      };
      fetchDirections();
    }
  }, [pickUpLAT, pickUpLNG, dropOffLAT, dropOffLNG, isLoaded, loadError]);

  useEffect(() => {
    setDriverPosition({ lat: driverLAT, lng: driverLNG });
  }, [driverLAT, driverLNG]);

  const center = {
    lat: (pickUpLAT + dropOffLAT) / 2,
    lng: (pickUpLNG + dropOffLNG) / 2,
  };

  const mapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    draggable: true,
    keyboardShortcuts: true,
    streetViewControl: true,
    fullscreenControl: true,
    styles: mapStyles,
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      options={mapOptions}
    >
      <Marker position={{ lat: pickUpLAT, lng: pickUpLNG }} />
      <Marker position={{ lat: dropOffLAT, lng: dropOffLNG }} />
      <Marker
        position={driverPosition}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: "#0866FF",
          fillOpacity: 0.8,
          strokeColor: "white",
          strokeWeight: 2,
        }}
      />

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default React.memo(EmbeddedMap);
