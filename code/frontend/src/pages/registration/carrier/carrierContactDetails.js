import React from "react";
import Protector from "../../../components/utils/methods/getters/protector.js";

export default function CarrierContactDetails() {
  Protector("/api/carriercontactdetails");
  return (
    <div>CarrierCompanyDetails</div>
  )
}
