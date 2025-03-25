import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { supabaseClient } from '../../service/supabase-helper.js'
import '../../styles/style.css'


export default function Header() {

  const navigate = useNavigate()

  const handleSignOut = async () => {
    let { error } = await supabaseClient.auth.signOut()
    if (error) throw error
    navigate("/login")
  }

  return (
    <header className="bg-white dark:bg-gray-900 ">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className=" text-teal-600 dark:text-teal-300" to="/home">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z" />
          </svg>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-white">
              <li>
                <Link onClick={handleSignOut}
                  className="text-xl px-4 py-2 rounded-lg shadow-md border-2  bg-transparent hover:bg-gray-200  transition-all duration-300"
                  to="/login"
                >
                  Sign out
                </Link>
              </li>

              <li>
                <NavLink
                  className="text-xl px-4 py-2 rounded-lg shadow-md border-2  bg-transparent hover:bg-gray-200  transition-all duration-300"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-xl px-4 py-2 rounded-lg shadow-md border-2  bg-transparent hover:bg-gray-200  transition-all duration-300"
                  to="/account"
                >
                  Account
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-xl px-4 py-2 rounded-lg shadow-md border-2  bg-transparent hover:bg-gray-200  transition-all duration-300"
                  to="/saved"
                >
                  Saved
                </NavLink>
              </li>


            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
              dark:hover:bg-teal-500"
                to={"/login"}
              >
                Login
              </Link>

              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                to={"/register"}
              >
                Register
              </Link>
            </div>

            <button
              className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
