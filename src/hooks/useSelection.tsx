import { useEffect, useState } from "react"

import { getSelection } from "../utils/functions"

export interface ISelectionProps {
  rects: DOMRect[] | []
  selectedText: string | null
}

export const useSelection = (): ISelectionProps => {
  const [selection, setSelection] = useState(getSelection())

  useEffect(() => {
    document.addEventListener("selectionchange", () =>
      setSelection(getSelection())
    )
    // Clean up event listners on unmount to prevent unecessary updates or memory leaks
    return () => {
      document.removeEventListener("selectionchange", () =>
        setSelection(getSelection())
      )
    }
  }, [setSelection])

  return selection
}
