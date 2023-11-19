import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Register from './components/Register/register';
import ShipperSidebar from './components/Sidebar/ShipperSideBar.js';
import ResetPassword from './components/ResetPassword/Reset';
import ShipperBusinessDetail from './components/shipper-business-details';
import ShipperCompanyDetail from './components/shipper-company-details';
import PostLoad from './components/Shipper/PostLoad.js'
import Signin from './components/Signup/signup';
import TrackLoad from './components/Shipper/TrackLoad.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter >
        <Routes>
          <Route path="/" element ={<TrackLoad/>} />
          <Route path="/register" element ={<Signin/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/resetPassword" element ={<ResetPassword/>} />
          <Route path="/shipperBusinessDetail" element ={<ShipperBusinessDetail/>} />
          <Route path="/shipperCompanyDetail" element ={<ShipperCompanyDetail/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
