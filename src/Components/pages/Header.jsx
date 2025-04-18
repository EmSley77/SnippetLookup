import React from 'react';
import { Link, NavLink } from 'react-router';
import '../../styles/style.css';
import useAuth from '../../hooks/useAuth.jsx'

export default function Header() {


  const { signOut } = useAuth()
  const buttons = "border-primary border rounded-md inline-flex items-center justify-center py-3 px-7  hover:bg-blue-light-5 hover:text-indigo-500 dark:hover:text-dark-3 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-blue-light-3 transition-all"

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-6 border-gray-200 border-b-blue-500">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link className="text-blue-800 flex items-center gap-2 font-bold text-xl" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
            <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Z" />
          </svg>
          CodeBlock
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink className="hover:text-blue-600 transition" to="/about">About</NavLink>
          <NavLink className="hover:text-blue-600 transition" to="/">Browse</NavLink>
          <NavLink className="hover:text-blue-600 transition" to="/account">Account</NavLink>
          <NavLink className="hover:text-blue-600 transition" to="/saved">Saved</NavLink>
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link className={`border-primary border rounded-md inline-flex items-center justify-center py-3 px-7 hover:bg-blue-700 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-blue-light-3 transition-all bg-blue-800 text-white`} to="/create">
            Create Post
          </Link>
          <button
            onClick={signOut}
            className={buttons}
          >
            Sign Out
          </button>
          <Link
            className={buttons} to="/login">
            Login
          </Link>
          <Link
            className={buttons} to="/register">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};
