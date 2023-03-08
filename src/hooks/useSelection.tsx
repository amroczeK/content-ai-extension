import debounce from "lodash.debounce"
import { useEffect, useMemo, useState } from "react"

import { getSelection } from "../utils/functions"

export interface ISelectionProps {
  rects: DOMRect[] | []
  selectedText: string | null
}

export const useSelection = (): ISelectionProps => {
  const [selection, setSelection] = useState(getSelection())

  const selectionHandler = () => setSelection(getSelection())

  // Debounce handler to improve performance, preventing re-rendering of parent component using the useSelection hook.
  // The selection handler is debounced and the selection is set 500ms after the user has made a selection on the browser.
  // Without debouncing, useMemo or useCallback, the selection handler would be called on every selection change,
  // causing multiple re-rendering as the mouse moves.
  const debouncedSelectionHandler = useMemo(
    () => debounce(selectionHandler, 500),
    []
  )

  useEffect(() => {
    document.addEventListener("selectionchange", () =>
      debouncedSelectionHandler()
    )
    // Clean up event listners on unmount to prevent unecessary updates or memory leaks
    return () => {
      document.removeEventListener("selectionchange", () =>
        debouncedSelectionHandler()
      )
    }
  }, [setSelection])

  return selection
}
