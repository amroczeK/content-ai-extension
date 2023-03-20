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

/**
 * The user flow is as follows:
 * 1. User makes selection and the component is rendered with information from the current selection.
 * 2. The user can perform actions on the selection using the available actions in the rendered component.
 * 3. The user must close the component before making a new selection.
 */
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
      let lastRect = selected.rects.at(-1) // Get last element of array
      setStyle({
        position: "absolute",
        top: `${lastRect.bottom}px`,
        left: `${lastRect.right - 448}px` // Use width of component as offset
      })
      setIsOpen(true)
    }
  }, [selected])

  return selected.rects?.length && isOpen ? (
    <div
      ref={contentRef}
      id="content-container"
      className="z-50"
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
        <div className="base mt-2">
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="custom-prompt">
            Answer
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
