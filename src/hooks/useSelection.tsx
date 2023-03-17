import debounce from "lodash.debounce"
import { useCallback, useEffect, useMemo, useState } from "react"

import { getSelection } from "../utils/functions"

export interface ISelection {
  rects: DOMRect[] | []
  selectedText: string | null
}

export const useSelection = (): ISelection => {
  const [selection, setSelection] = useState<ISelection>({
    rects: [],
    selectedText: ""
  })

  const selectionHandler = () => setSelection(getSelection())

  // Example using useCallback
  const debouncedSelectionHandler = useCallback(
    () => debounce(selectionHandler, 500),
    [selection.selectedText]
  )

  useEffect(() => {
    document.addEventListener("selectionchange", debouncedSelectionHandler())

    // Clean up event listners on unmount to prevent unecessary updates or memory leaks
    return () => {
      document.removeEventListener(
        "selectionchange",
        debouncedSelectionHandler()
      )
    }
  }, [])

  return selection
}
