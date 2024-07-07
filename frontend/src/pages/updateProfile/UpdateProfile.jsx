import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./updateProfile.css";
import Spinner from "../../components/Spinner/Spinner";

const UpdateProfile = () => {
  const { url, token } = useContext(StoreContext);

  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    currentPassword: "",
    password: "",
  });

  const onChangeHandler = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setData((data) => ({ ...data, [name]: files[0] }));
    } else {
      setData((data) => ({ ...data, [name]: value }));
    }
  };

  const updateData = async (e) => {
    setLoader(true);
    e.preventDefault();
    const formData = new FormData();

    const config = {
      headers: { token },
      "Content-Type": "multipart/form-data",
    };

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phone);
    formData.append("image", data.image);
    formData.append("currentPassword", data.currentPassword);
    formData.append("password", data.password);

    const response = await axios.put(
      url + "/api/user/edit-profile",
      formData,
      config
    );

    if (response.data.success) {
      localStorage.removeItem("pfp");
      localStorage.setItem("pfp", response.data.data.imageUrl);
      setLoader(false);
    }
  };

  return (
    <div className="update-profile-container">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <h2>Update Your Profile</h2>

          <form onSubmit={updateData} className="update-profile-form">
            <label
              htmlFor="imageUpload"
              className="file-input-label"
              value={data.image}
              onChange={onChangeHandler}
            >
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
              type="text"
              name="name"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              className="update-profile-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={data.email}
              onChange={onChangeHandler}
              className="update-profile-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={data.phone}
              onChange={onChangeHandler}
              className="update-profile-input"
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateProfile;
