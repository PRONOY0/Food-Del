import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/loginPopup/LoginPopup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {
      showLogin ? (<LoginPopup setShowLogin={setShowLogin}/>) : (<></>)
    }
      <div className="App">
        <ToastContainer/>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/edit-profile" element={<UpdateProfile/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:userId" element={<ResetPassword setShowLogin={setShowLogin}/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
