import { supabaseClient } from '../../service/supabase-helper.js'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import '../../styles/style.css'


export default function Header() {

  const navigate = useNavigate()
  const handleLogOut = async () => {
    let { error } = await supabaseClient.auth.signOut()
    if (error) throw error
    navigate("/")
  }
  return (
    <header className="bg-white shadow-lg py-4 px-6">
      <div className="flex justify-between items-center w-full flex-wrap gap-y-2">
        {/* Logout Button */}
        <Link
          className="text-xl px-4 py-2 rounded-lg shadow-md bg-gray-900 hover:bg-red-500 text-white transition-all duration-500"
          onClick={handleLogOut}
        >
          Logout
        </Link>


        {/* Navigation Links */}
        <nav className="flex gap-x-6">

          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-gray-900 hover:bg-blue-500  text-white transition-all duration-500"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-gray-900 hover:bg-blue-500  text-white transition-all duration-500"
            to="/account"
          >
            Account
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-gray-900 hover:bg-blue-500  text-white transition-all duration-500"
            to="/saved"
          >
            Saved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
