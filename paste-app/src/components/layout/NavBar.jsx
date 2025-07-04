import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-row items-center justify-between px-6 py-3">
        <div className="text-xl font-bold text-blue-400 tracking-wide">PasteApp</div>
        <div className="flex flex-row gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-300 hover:text-blue-400 transition font-medium ${isActive ? 'text-blue-400 underline' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-gray-300 hover:text-blue-400 transition font-medium ${isActive ? 'text-blue-400 underline' : ''}`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
