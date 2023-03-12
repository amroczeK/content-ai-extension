import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { CSSProperties, useEffect, useState } from "react"

import Dropdown from "~components/Dropdown"
import { useSelection } from "~hooks/useSelection"

import "./style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function Content() {
  const [style, setStyle] = useState<CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0
  })
  const [answer, setAnswer] = useState<string | null>(null)

  const selected = useSelection()

  const answerHandler = (response: string | null) => {
    setAnswer(response)
  }

  useEffect(() => {
    if (selected.rects.length) {
      let lastRect = selected.rects[selected.rects.length - 1]
      setStyle({
        position: "absolute",
        top: lastRect.y,
        left: lastRect.x + lastRect.width
      })
    }
  }, [selected])

  return (
    <>
      {selected.rects?.length ? (
        <div id="button-container" className="z-50" style={{ ...style }}>
          <div className="ml-2">
            <Dropdown
              selectedText={selected.selectedText}
              answerHandler={answerHandler}
            />
          </div>
        </div>
      ) : answer ? (
        <div className="z-50 flex fixed top-32 right-8">
          <div
            className={`p-4 text-black font-sans rounded-md max-w-[52ch] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            <h2 className="text-md mb-2">Response</h2>
            <p>{answer}</p>
            <button
              type="button"
              className="cursor-pointer w-fit rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              onClick={() => answerHandler(null)}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Content
