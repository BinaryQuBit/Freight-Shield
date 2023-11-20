import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Register from './components/Register/register';
import ShipperSidebar from './components/Sidebar/ShipperSideBar.js';
import ResetPassword from './components/ResetPassword/Reset';
import ShipperBusinessDetail from './components/shipper-business-details';
import ShipperCompanyDetail from './components/shipper-company-details';
import PostLoad from './components/Shipper/PostLoad.js'
import Signin from './components/Signup/signup';
import Settings from './components/Shipper/Setting.js'
import TrackLoad from './components/Shipper/TrackLoad.js'
import History from './components/Shipper/History.js'
import MyLoads from './components/Shipper/MyLoad.js'
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter >
        <Routes>
          <Route path="/shipperSettings" element ={<Settings/>} /> 
          <Route path="/shipperHistory" element ={<History/>} /> 
          <Route path="/trackLoad" element ={<TrackLoad/>} /> 
          <Route path="/myLoads" element ={<MyLoads/>} /> 
          <Route path="/postLoad" element ={<PostLoad/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/resetPassword" element ={<ResetPassword/>} />
          <Route path="/shipperBusinessDetail" element ={<ShipperBusinessDetail/>} />
          <Route path="/shipperCompanyDetail" element ={<ShipperCompanyDetail/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
