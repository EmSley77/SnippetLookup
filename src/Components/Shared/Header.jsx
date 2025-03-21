import React from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router'
import { SupabaseClient } from '@supabase/supabase-js'
import '../../Styles/header.css'


export default function Header() {

  const navigate = useNavigate()
  const handleLogOut = async () => {
    let { error } = await SupabaseClient.auth.signOut()

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
      <NavLink className='header-link' to={"/"}>Home</NavLink>
      <NavLink className='header-link' to={`/account/${2}`}>Account</NavLink>
      {/*    <NavLink className='header-link'>Liked</NavLink>
          <NavLink className='header-link'>Account</NavLink> */}
    </div>
  )
}

