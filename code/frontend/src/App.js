import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ForgotPassword from "./pages/ForgotPassword.js"
import Pending from "./pages/admin/Pending.js"
import Approved from "./pages/admin/Approved.js"
import Administrators from "./pages/admin/Administrators.js"
import Shippers from "./pages/admin/Shippers.js"
import Carriers from "./pages/admin/Carriers.js"
import AdminSettings from "./pages/admin/AdminSettings.js"
import ActiveLoads from "./pages/shipper/ActiveLoads.js"
import PostLoad from "./pages/shipper/PostLoad.js";
import TrackLoad from "./pages/shipper/TrackLoad.js";
import History from "./pages/shipper/History.js";
import ShipperSettings from "./pages/shipper/ShipperSettings.js";
import Marketplace from "./pages/carrier/Marketplace.js";
import MyLoads from "./pages/carrier/MyLoads.js";
import DriverProfile from "./pages/carrier/DriverProfile.js";
import UnitProfile from "./pages/carrier/UnitProfile.js";
import CarrierSettings from "./pages/carrier/CarrierSettings.js";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
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

        <Route path="/postLoad" element={<PostLoad />} />
        <Route path="/trackLoad" element={<TrackLoad />} />
        <Route path="/history" element={<History />} />
        <Route path="/shippersettings" element={<ShipperSettings />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/myloads" element={<MyLoads />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/unitprofile" element={<UnitProfile />} />
        <Route path="/carriersettings" element={<CarrierSettings />} />

      </Routes>
    </BrowserRouter>
  );
}
