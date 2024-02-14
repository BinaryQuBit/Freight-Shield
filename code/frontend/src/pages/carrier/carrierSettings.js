import Sidebar from "../../components/sidebar/carrierSideBar.js";
import React from "react";
import EaseOut from "../../components/responsiveness/easeOut.js"
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js"

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
