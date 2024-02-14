import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/responsiveness/context.js";

import Homepage from "./pages/homepage.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import ForgotPassword from "./pages/forgotPassword.js"
import Pending from "./pages/admin/pending.js"
import Approved from "./pages/admin/approved.js"
import Administrators from "./pages/admin/administrators.js"
import Shippers from "./pages/admin/shippers.js"
import Carriers from "./pages/admin/carriers.js"
import AdminSettings from "./pages/admin/adminSettings.js"
import ActiveLoads from "./pages/shipper/activeLoads.js"
import PostLoad from "./pages/shipper/postLoad.js";
import History from "./pages/shipper/history.js";
import ShipperSettings from "./pages/shipper/shipperSettings.js";
import Marketplace from "./pages/carrier/marketplace.js";
import MyLoads from "./pages/carrier/myLoads.js";
import DriverProfiles from "./pages/carrier/driverProfiles.js";
import UnitProfiles from "./pages/carrier/unitProfiles.js";
import CarrierSettings from "./pages/carrier/carrierSettings.js";
import CarrierBusinessDetails from "./pages/registration/carrier/carrierBusinessDetails.js"
import CarrierContactDetails from "./pages/registration/carrier/carrierContactDetails.js"
import CarrierSubmission from "./pages/registration/carrier/carrierSubmission.js";
import ShipperBusinessDetails from "./pages/registration/shipper/shipperBusinessDetails.js"
import ShipperContactDetails from "./pages/registration/shipper/shipperContactDetails.js"
import ShipperSubmission from "./pages/registration/shipper/shipperSubmission.js";

export default function App() {
  return (
    <SidebarProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/shippers" element={<Shippers />} />
        <Route path="/carriers" element={<Carriers />} />
        <Route path="/adminsettings" element={<AdminSettings />} />
        <Route path="/activeloads" element={<ActiveLoads />} />
        <Route path="/postload" element={<PostLoad />} />
        <Route path="/history" element={<History />} />
        <Route path="/shippersettings" element={<ShipperSettings />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/myloads" element={<MyLoads />} />
        <Route path="/driverprofiles" element={<DriverProfiles />} />
        <Route path="/unitprofiles" element={<UnitProfiles />} />
        <Route path="/carriersettings" element={<CarrierSettings />} />
        <Route path="/carrierbusinessdetails" element={<CarrierBusinessDetails/>} />
        <Route path="/carriercontactdetails" element={<CarrierContactDetails/>} />
        <Route path="/carriersubmission" element={<CarrierSubmission/>} />
        <Route path="/shipperbusinessdetails" element={<ShipperBusinessDetails/>} />
        <Route path="/shippercontactdetails" element={<ShipperContactDetails/>} />
        <Route path="/shippersubmission" element={<ShipperSubmission/>} />
      </Routes>
    </BrowserRouter>
    </SidebarProvider>
  );
}
