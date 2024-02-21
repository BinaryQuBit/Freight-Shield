// Driver Profiles Page

import Sidebar from "../../components/sidebar/carrierSideBar.js";
import React from "react";
import EaseOut from "../../components/responsiveness/easeOut.js"
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js"

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
