import React from 'react'
import "./navbar.css"
import navLogo from "../../../../assets/logo.png"
import navProfile from "../../../../assets/profile.jpg"



const Navbar = () => {
  return (
    <span className='navbar'>
      <img src={navLogo} className='nav-logo' alt="" />
      <img src={navProfile} className='nav-profile' alt="" />
    </span>
  )
}

export default Navbar
