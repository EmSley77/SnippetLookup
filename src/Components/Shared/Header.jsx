import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { supabaseClient } from '../../service/supabase-helper.js';
import { getSession } from '../../service/user-session.js';
import '../../styles/style.css';
import DangerAlert from '../util/DangerAlert.jsx'

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const data = await getSession()
    if (!data) {
      return alert("You are already signed out please sign in again")
    }

    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/'); // Redirect to home page after sign out
    } catch (error) {
      alert("An error occurred while signing out. Please try again.");
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-lg  sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link className="text-teal-600 flex items-center gap-2" to="/home">
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#0d9488">
            <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z" />
          </svg>
          <span className="text-lg font-semibold">CodeBlock</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/about">About</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/">Browse</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/account">Account</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/saved">Saved</NavLink>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 text-teal-600 border-2 border-teal-600 rounded-md text-lg font-medium hover:bg-teal-600 hover:text-white transition cursor-pointer">
            Sign out
          </button>
          <Link className="px-5 py-2.5 text-white bg-teal-600 rounded-md text-lg font-medium hover:bg-teal-700 transition" to="/login">Login</Link>
          <Link className="px-5 py-2.5 text-teal-600 border-2 border-teal-600 rounded-md text-lg font-medium hover:bg-teal-600 hover:text-white transition" to="/register">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md p-4 flex flex-col gap-4">
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/">Home</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/about">About</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/account">Account</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-600 transition" to="/saved">Saved</NavLink>
          <button
            onClick={handleSignOut}
            className="w-full text-lg px-4 py-2 rounded-md border-2 border-gray-300 bg-transparent hover:bg-gray-100 transition-all ">
            Sign out
          </button>
          <Link className="w-full text-center px-5 py-2.5 text-white bg-teal-600 rounded-md text-lg font-medium hover:bg-teal-700 transition" to="/login">Login</Link>
          <Link className="w-full text-center px-5 py-2.5 text-teal-600 border-2 border-teal-600 rounded-md text-lg font-medium hover:bg-teal-600 hover:text-white transition" to="/register">Register</Link>
        </div>
      )}
    </header>
  );
}
