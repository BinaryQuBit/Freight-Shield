import React from "react";
import Protector from "../../../components/utils/methods/getters/protector.js";

function CarrierSubmission() {
  Protector("/api/carriersubmission")
  return (
    <div>CarrierSubmission</div>
  )
}

export default CarrierSubmission
