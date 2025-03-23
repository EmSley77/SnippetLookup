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
    <header className="shadow-lg py-4 px-6 bg-gray-900">
      <div className="flex justify-between items-center w-full flex-wrap gap-y-2">

        {/* Logout Button */}
        <Link
          className="text-xl px-4 py-2 rounded-lg shadow-md bg-indigo-700 hover:bg-red-500 text-white transition-all duration-300"
          onClick={handleLogOut}
        >
          Logout
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-x-6">

          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-indigo-700 hover:bg-blue-500 text-white transition-all duration-300"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-indigo-700 hover:bg-blue-500 text-white transition-all duration-300"
            to="/account"
          >
            Account
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-indigo-700 hover:bg-blue-500 text-white transition-all duration-300"
            to="/saved"
          >
            Saved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
