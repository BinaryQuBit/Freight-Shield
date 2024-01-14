import React from 'react'
import Header from "../../../components/header/Header.js"
import ShipperCompanyDetailsForm from '../../../components/forms/ShipperCompanyDetailsForm.js'

function ShipperCompanyDetails() {
  return (
    <>
        <Header title = "Company Details" />
        <ShipperCompanyDetailsForm />
    </>
  )
}

export default ShipperCompanyDetails