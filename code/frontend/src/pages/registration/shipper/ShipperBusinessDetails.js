import React from 'react'
import Header from "../../../components/header/Header.js"
import ShipperCompanyDetailsForm from '../../../components/forms/ShipperBusinessDetailsForm.js'

function ShipperBusinessDetails() {
  return (
    <>
        <Header title = "Business Details" />
        <ShipperCompanyDetailsForm />
    </>
  )
}

export default ShipperBusinessDetails