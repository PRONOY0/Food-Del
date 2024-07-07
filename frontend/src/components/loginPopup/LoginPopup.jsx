import React, { useContext, useState } from "react";
import { assets } from "../../frontend_assets/assets";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Sign Up");

  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });

  const onChangeHandler = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setData((data) => ({ ...data, [name]: files[0] }));
    } else {
      setData((data) => ({ ...data, [name]: value }));
    }
  };

  const onLogin = async (e) => {
    setLoader(true);
    e.preventDefault();
    let newUrl = url;

    try {
      if (currentState === "Login") {
        newUrl += "/api/user/login";

        const response = await axios.post(
          newUrl,
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("pfp", response.data.imageUrl);
          setShowLogin(false);
          setLoader(false);
        } else {
          toast.error(response.data.message);
          setLoader(false);
        }
      } else {
        newUrl += "/api/user/signup";
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phoneNumber", data.phone);
        formData.append("image", data.image);

        const response = await axios.post(newUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("pfp", response.data.Saveduser.imageUrl);
          setShowLogin(false);
          setLoader(false);
        } else {
          setLoader(false);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Login failed due to", error);
    }
  };

  return (
    <div className="login-popup">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
              <h2>{currentState}</h2>
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt=""
              />
            </div>

            <div className="login-popup-inputs">
              {currentState === "Login" ? (
                <></>
              ) : (
                <>
                  <label htmlFor="imageUpload" className="file-input-label">
                    <p>Upload your Profile Picture</p>
                    <img src={assets.upload} alt="" width={150} />
                  </label>

                  <input
                    onChange={onChangeHandler}
                    name="image"
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="file-input"
                    hidden
                  />

                  <input
                    onChange={onChangeHandler}
                    value={data.name}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />

                  <input
                    onChange={onChangeHandler}
                    value={data.phone}
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    required
                  />
                </>
              )}

              <input
                onChange={onChangeHandler}
                value={data.email}
                name="email"
                type="email"
                placeholder="Your email"
                required
              />

              <input
                onChange={onChangeHandler}
                value={data.password}
                name="password"
                type="password"
                placeholder="Password"
                required
              />

              <div
                onClick={() => {
                  navigate("/forgot-password");
                  setShowLogin(false)
                }}
                className={`${currentState === "Login" ? "show" : "hidden"} forgot-password-link`}
              >
                Forgot Password?
              </div>
            </div>

            <button type="submit">
              {currentState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>

            {currentState === "Login" ? (
              <p>
                Create a new account?{" "}
                <span
                  onClick={() => {
                    setCurrentState("Sign Up");
                  }}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrentState("Login");
                  }}
                >
                  Login here
                </span>
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPopup;
