import React, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import axios from "axios";

const Verify = () => {
  const location = useLocation();
  const { search } = location;
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Parse query parameters from the search string
  const params = new URLSearchParams(search);
  const success = params.get("success");
  const orderId = params.get("orderId");

  console.log(success,orderId);

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
