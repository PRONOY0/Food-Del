import "./navbar.css";
import React from 'react'
import {assets} from '../../admin_assets/assets'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className='' src={assets.logo} alt=""/>
      <img className='' src={assets.profile_image} alt=""/>
    </div>
  )
}

export default Navbar
