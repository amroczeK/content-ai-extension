import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

import { CountButton } from "~components/CountButton"
import Dropdown from "~components/Dropdown"
import { useSelection } from "~hooks/useSelection"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function Content() {
  const selected = useSelection()
  console.log(selected)

  let style = {}
  if (selected.rects.length) {
    let lastRect = selected.rects[selected.rects.length - 1]
    console.log(lastRect)
    style = {
      position: "absolute ",
      top: lastRect.y,
      left: lastRect.x + lastRect.width
    }
  }
  return (
    <>
      {selected.rects?.length ? (
        <div id="button-container" className="z-50" style={{ ...style }}>
          <div className="ml-2">
            <CountButton />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Content
