import React from "react"

import DropdownButton from "./DropdownButton"

function Dropdown() {
  return (
    <div className="relative inline-block text-left">
      <div>
        <DropdownButton />
      </div>

      <ul
        className="absolute py-1 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button">
        <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
          Account settings
        </li>
        <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
          Account settings
        </li>
        <li className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
          Account settings
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
