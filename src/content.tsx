import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { CSSProperties, useEffect, useRef, useState } from "react"

import Dropdown from "~components/Dropdown"
import Form from "~components/Form"
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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const selected = useSelection(contentRef)

  const answerHandler = (response: string | null) => {
    setAnswer(response)
  }

  useEffect(() => {
    if (selected.rects.length) {
      let lastRect = selected.rects[selected.rects.length - 1]
      setStyle({
        position: "absolute",
        top: lastRect.y + lastRect.height,
        left: lastRect.x + lastRect.width - 448 // Subtract fixed width of form
      })
      setIsOpen(true)
    }
  }, [selected])

  return selected.rects?.length && isOpen ? (
    <div
      ref={contentRef}
      id="content-container"
      className="z-50 flex flex-col gap-2 mt-2"
      style={{ ...style }}>
      <Form
        selectedText={selected.selectedText}
        answerHandler={answerHandler}
        closeHandler={() => {
          answerHandler(null)
          setIsOpen(false)
        }}
      />
      {answer && (
        <div
          className={`p-4 rounded min-w-[32ch] max-w-[52ch] bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="custom-prompt">
            Selected text
          </label>
          <p>{answer}</p>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

export default Content
