import React, { useState, useEffect } from "react";

const DistanceCalculator = ({
  origin,
  destination,
  unitRequested,
}) => {
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState(null);

  const calculateDistance = () => {
    if (origin && destination && window.google) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: parseFloat(origin.lat), lng: parseFloat(origin.lng) }],
          destinations: [{ lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) }],
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const results = response.rows[0].elements;
            const element = results[0];
            const distanceInMiles = element.distance.value / 1000 / 1.60934;
            setDistance(`${(element.distance.value / 1000).toFixed(2)} km`);
            rateCalculator(distanceInMiles);
          }
        }
      );
    }
  };

  const rateCalculator = (distanceInMiles) => {
    const rates = {
      "Dry Van": 1.99,
      "Flat Bed": 2.26,
      "Reefer": 2.30,
      "Low Boy": 6.75,
      "Step Deck": 3.25,
      "Tank": 3.50,
      "Conestega": 3.50,
      "Double Drop": 4.00,
      "Car Carriers": 12.5,
      "Side kit": 3.25,
      "Dump": 3.00,
      "Live Floor": 3.50,
      "End Dump": 3.50,
      "Side Dump": 3.50,
      "OverLoad": 4.00,
      "Rocky Mountain": 3.50,
      "Twinpike": 3.50,
      "LHV": 3.50,
      "Super B": 3.50,
    };

    const ratePerMile = rates[unitRequested] || 0;
    const calculatedPrice = ratePerMile * distanceInMiles;
    setPrice(`$${calculatedPrice.toFixed(2)}`);
  };

  useEffect(() => {
    calculateDistance();
  }, [origin, destination, unitRequested]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {distance && (
        <div style={{ display: "flex", marginRight: "20px" }}>
          <p style={{ fontWeight: "bold", marginRight: "5px" }}>Distance:</p>
          <p>{distance}</p>
        </div>
      )}
      {price && (
        <div style={{ display: "flex", marginRight: "20px" }}>
          <p style={{ fontWeight: "bold", marginRight: "5px" }}>Estimated Price:</p>
          <p>{price}</p>
        </div>
      )}
    </div>
  );
};

export default DistanceCalculator;