import React from "react";
import AdminSidebar from "../../components/sidebar/adminSideBar.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";

export default function AdminSettings() {
  Protector("/api/adminsettings");
  const { data } = useData();
  const { firstName, lastName } = data.user || {};

  return (
    <>
      <AdminSidebar activePage={"adminSettings"} />
      <EaseOut>
        <UserHeader
          title="Admin Settings"
          userInfo={{ firstName, lastName }}
        />
      </EaseOut>
    </>
  );
}
