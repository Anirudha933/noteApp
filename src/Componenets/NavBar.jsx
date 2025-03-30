import React from 'react'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
      <ul className='flex flex-row gap-4 '>
        <li>
            <NavLink to={"/"}>
            HOME</NavLink>
        </li>
        <li>
            <NavLink to={"/notes"}>
            NOTES</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
