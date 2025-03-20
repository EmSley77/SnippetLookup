import React from 'react'
import { NavLink } from 'react-router'


export default function Header() {
  return (
    <div style={{

      padding: "1.4rem",
      display: "flex",
      justifyContent: "space-around",
      borderBottom: "2px solid #fff"

    }}>
      {/*       <NavLink className='header-link'>Logout</NavLink> */}
      <NavLink className='header-link' to={"/"}>Home</NavLink>
      <NavLink className='header-link' to={`/account/${2}`}>Account</NavLink>
      {/*    <NavLink className='header-link'>Liked</NavLink>
          <NavLink className='header-link'>Account</NavLink> */}
    </div>
  )
}


/* 

Link css 
.button {
  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;
}

.button:hover::before {
  transform: scaleX(1);
}

.button-content {
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  transition: all 0.475s;
}

*/