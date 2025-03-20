import React from 'react'
import { NavLink } from 'react-router'
import '../../Styles/header.css'


export default function Header() {
  return (
    <div style={{

      padding: "1.4rem",
      display: "flex",
      justifyContent: "space-around",
      background: "linear-gradient(to right, #390057, #650399, #b803b8, #ff00ff)",
    }}>
      {/*       <NavLink className='header-link'>Logout</NavLink> */}
      <NavLink className='header-link' to={"/"}>Home</NavLink>
      <NavLink className='header-link' to={`/account/${2}`}>Account</NavLink>
      {/*    <NavLink className='header-link'>Liked</NavLink>
          <NavLink className='header-link'>Account</NavLink> */}
    </div>
  )
}

