import React from 'react'
import { Link, NavLink } from 'react-router'

export default function Header() {
  return (
    <div style={{
     
        padding:"1.4rem",
        display:"flex",
        justifyContent:"space-around",
   
    }}>
          <NavLink className='header-link'>Logout</NavLink>
          <NavLink className='header-link' to={"/"}>Home</NavLink>
          <NavLink className='header-link' to={`/account/${2}`}>Account</NavLink>
          <NavLink className='header-link'>Liked</NavLink>
          <NavLink className='header-link'>Account</NavLink>
    </div>
  )
}
