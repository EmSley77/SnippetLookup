import { supabaseClient } from '../../Helper/supabase-helper.js'
import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import '../../Styles/header.css'


export default function Header() {

  const navigate = useNavigate()
  const handleLogOut = async () => {
    let { error } = await supabaseClient.auth.signOut()
    if (error) throw error
    navigate("/")
  }
  return (
    <div style={{

      padding: "1.4rem",
      display: "flex",
      justifyContent: "space-around",
      background: "linear-gradient(to right, #390057, #650399, #b803b8, #ff00ff)",
    }}>
      <NavLink className='header-link' onClick={handleLogOut}>Logout</NavLink>
      <NavLink className='header-link' to={"/home"}>Home</NavLink>
      <NavLink className='header-link' to={`/account`}>Account</NavLink>
      {/*    <NavLink className='header-link'>Liked</NavLink>
          <NavLink className='header-link'>Account</NavLink> */}
    </div>
  )
}

