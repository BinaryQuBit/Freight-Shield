import Sidebar from "../../components/sidebar/CarrierSideBar";
import React from "react";
import EaseOut from "../../components/responsiveness/EaseOut"
import UserHeader from "../../components/header/UserHeader";
import Protector from "../../components/utils/methods/getters/Protector.js"

export default function CarrierSettings() {
Protector("/carriersettings");

  return (
    <>
      <Sidebar activePage="carrierSettings" />
      <EaseOut>
        <UserHeader title="Carrier Settings" />
      </EaseOut>
    </>
  );
}
