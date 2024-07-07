import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { assets } from "../../frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CiUser } from "react-icons/ci";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, setToken, token, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pfp");
    setToken("");
    navigate("/");
  };

  const extract_pfp = localStorage.getItem("pfp");

  const [urlPFP, setUrlPFP] = useState(false);
  
  useEffect(() => {
    if (extract_pfp && extract_pfp.includes('https')) {
      setUrlPFP(true);
    }
  }, [extract_pfp]);


  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => {
            setMenu("mobile-app");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={urlPFP ? `${extract_pfp}` : `${url}/images/${extract_pfp}`} alt="" className="user-pic-circle"/>

            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Orders
                </p>
              </li>

              <hr />

              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={logout}>Logout</p>
              </li>

              <hr />

              <li>
                <CiUser className="profile-icon-navbar" />
                <p
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
