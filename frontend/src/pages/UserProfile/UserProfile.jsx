import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import Spinner from "../../components/Spinner/Spinner";

const UserProfile = () => {
  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);
  const [userData, setUserData] = useState([]);
  const [loader,setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    const response = await axios.post(
      url + "/api/user/profile",
      {},
      { headers: { token } }
    );
    setLoader(false);
    setUserData(response.data.data);
    localStorage.setItem("pfp", response.data.data.imageUrl);
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const extract_pfp = localStorage.getItem("pfp");

  const [urlPFP, setUrlPFP] = useState(false);
  
  useEffect(() => {
    if (extract_pfp && extract_pfp.includes('https')) {
      setUrlPFP(true);
    }
  }, [extract_pfp]);

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <span>Update your photo and personal details here.</span>

      <form onSubmit={()=>{navigate('/edit-profile')}}>
        <div className="profile-divs">
          <div className="profile-name">
            <p className="user-details">Name</p>
            <p className="user-name">{userData.name}</p>
          </div>
        </div>

        <div className="profile-divs">
          <div className="profile-email">
            <p className="user-details">Email</p>
            <p className="user-email">{userData.email}</p>
          </div>
        </div>

        <div className="pfps-div">
          <div className="profile-pic">
            <p className="user-details">Your Photo</p>
            <span>This will be displayed on your profile</span>
          </div>

          <div>
            <img src={urlPFP ? `${extract_pfp}` : `${url}/images/${extract_pfp}`} alt="" className="user-profile-pic"/>
          </div>
        </div>

        <div className="profile-divs">
          <div className="profile-phone">
            <p className="user-details">Phone Number</p>
            <p className="user-phone">+91-{userData.phoneNumber}</p>
          </div>
        </div>

        <div className="btn-div">
          <button type="submit" className="update-profile-btn">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
