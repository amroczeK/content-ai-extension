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
  // Without useMemo or useCallback, hook would cause re-rendering each time the selection changes.
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
