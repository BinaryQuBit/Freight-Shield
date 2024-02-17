import React from "react";

import Protector from "../../../components/utils/methods/getters/protector.js";

export default function CarrierBusinessDetails() {
  Protector("/api/carrierbusinessdetails")

  return (
    <div>CarrierBusinessDetails</div>
  )
}
