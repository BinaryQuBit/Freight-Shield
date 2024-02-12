import Sidebar from "../../components/sidebar/CarrierSideBar";
import React from "react";
import EaseOut from "../../components/responsiveness/EaseOut"
import UserHeader from "../../components/header/UserHeader";
import Protector from "../../components/utils/methods/getters/Protector.js"

export default function DriverProfile() {
  Protector("/driverprofiles");
  return (
    <>
      <Sidebar activePage="driverProfile" />
      <EaseOut>
        <UserHeader title="Driver Profiles" />
      </EaseOut>
    </>
  );
}
