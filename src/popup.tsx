import React from "react"

import { CountButton } from "./components/CountButton"

import "~base.css"
import "~style.css"

function Popup() {
  return (
    <div className="flex items-center justify-center h-16 w-40 bg-black">
      <CountButton />
    </div>
  )
}

export default Popup
