import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { supabaseClient } from '../../service/supabase-helper.js';
import { getSession } from '../../service/user-session.js';
import '../../styles/style.css';

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
    <header className="bg-gray-950 shadow-lg sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link className="text-teal-400 flex items-center gap-2" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#faf089">
            <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Z" />
          </svg>
          <span className="text-lg font-semibold">CodeBlock</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6 text-gray-300">
          <NavLink className="text-lg font-medium hover:text-teal-400 transition" to="/about">About</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-400 transition" to="/">Browse</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-400 transition" to="/account">Account</NavLink>
          <NavLink className="text-lg font-medium hover:text-teal-400 transition" to="/saved">Saved</NavLink>
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            className="px-5 py-2.5 bg-teal-300  rounded-md text-lg font-medium hover:bg-teal-500 transition-all cursor-pointer"
            to="/create">Create Post</Link>
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 text-gray-300 border-2 rounded-md text-lg font-medium hover:bg-gray-800 transition-all cursor-pointer"
          >
            Sign out
          </button>
          <Link
            className="px-5 py-2.5 text-gray-300 border-2 rounded-md text-lg font-medium hover:bg-gray-800 transition-all cursor-pointer"
            to="/login">Login</Link>
          <Link
            className="px-5 py-2.5 text-gray-300 border-2 rounded-md text-lg font-medium hover:bg-gray-800 transition-all cursor-pointer"
            to="/register">Create account</Link>
        </div>

      </div>
    </header>
  );
}