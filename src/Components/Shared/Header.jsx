import { supabaseClient } from '../../service/supabase-helper.js'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import '../../styles/style.css'


export default function Header() {

  const navigate = useNavigate()
  const handleLogOut = async () => {
    let { error } = await supabaseClient.auth.signOut()
    if (error) throw error
    navigate("/login")
  }

  return (
    <header className="shadow-lg py-4 px-6 bg-black text-yellow-300">
      <div className="flex justify-between items-center w-full flex-wrap gap-y-2">

        {/* Logout Button */}
        <Link
          className="text-xl px-4 py-2 rounded-lg shadow-md border-2 border-yellow-300 bg-transparent hover:border-red-400 hover:text-red-400  transition-all duration-300"
          onClick={handleLogOut}
        >
          Logout
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-x-6">

          {/*     <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md bg-indigo-700 hover:bg-blue-500 text-white transition-all duration-300"
            to="/about"
          >
            About
          </NavLink> */}
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md border-2 border-yellow-300 bg-transparent hover:bg-gray-800  transition-all duration-300"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md border-2 border-yellow-300 bg-transparent hover:bg-gray-800  transition-all duration-300"
            to="/account"
          >
            Account
          </NavLink>
          <NavLink
            className="text-xl px-4 py-2 rounded-lg shadow-md border-2 border-yellow-300 bg-transparent hover:bg-gray-800  transition-all duration-300"
            to="/saved"
          >
            Saved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
