import React, { useState, useContext } from "react";
import "./ResetPassword.css";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ({ setShowLogin }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
  });

  const { userId } = useParams();
  
  const { url } = useContext(StoreContext);

  const [load, setLoad] = useState(false);

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;

    setData((data) => ({ ...data, [name]: value }));
  };

  const resetPasswordHandler = async (e) => {
    setLoad(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        url + `/api/user/reset-password/${userId}`,
        {
          password: data.password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("pfp", response.data.imageUrl);

        localStorage.setItem("token", response.data.token);

        setShowLogin(false);

        navigate("/");
      } else {
        toast.error(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);

      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="reset-password-container">
      {load ? (
        <Spinner />
      ) : (
        <>
          <h2>
            Reset Your Password to Continue Accessing Tomato Please enter a new
            password.
          </h2>

          <form onSubmit={resetPasswordHandler} className="reset-password-form">
            <input
              type="password"
              name="password"
              autoComplete="on"
              id="password"
              value={data.password}
              placeholder="Enter your new password"
              onChange={onChangeHandler}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
