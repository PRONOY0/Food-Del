import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const { url, showOTPsection, setShowOTPsection } =
    useContext(StoreContext);

  const [load, setLoad] = useState(false);

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;

    setData((data) => ({ ...data, [name]: value }));
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on the next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showOTPsection === true) {
      setLoad(true);

      const enteredOTP = otp.join("");

      const response = await axios.post(
        url + "/api/user/verify-otp",
        {
          email: data.email,
          otp: enteredOTP,
        },
        {}
      );
      
      if (response.data.success) {
        setLoad(false);
        setShowOTPsection(false);
        toast.success(response.data.message);
        navigate(response.data.reset_url);
      } else {
        toast.error(response.data.message);
        setLoad(false);
      }
    } else {
      setLoad(true);
      const response = await axios.post(
        url + "/api/user/forgot-password",
        data,
        {}
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setShowOTPsection(true);
        setLoad(false);
      }
    }
  };

  return (
    <div className="otp-container">
      {showOTPsection ? (
        load ? (
          <Spinner />
        ) : (
          <>
            <h2>
              Please enter the OTP sent to your email to verify your identity
              and proceed with changing your password.
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="otp-inputs">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </>
        )
      ) : load ? (
        <Spinner />
      ) : (
        <>
          <h2>
            Please enter your email address to receive an OTP for password
            reset.
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              <input
                type="email"
                name="email"
                autoComplete="on"
                placeholder="Enter your email"
                className="verification-email"
                value={data.email}
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
