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

  // Debounce handler to improve performance, preventing re-rendering of parent component using the useSelection hook.
  // The selection handler is debounced and the selection is set 500ms after the user has made a selection on the browser.
  // const debouncedSelectionHandler = useMemo(
  //   () => debounce(selectionHandler, 500),
  //   [selection.selectedText]
  // )

  // Example using useCallback
  const debouncedSelectionHandler = useCallback(
    () => debounce(selectionHandler, 500),
    [selection.selectedText]
  )

  useEffect(() => {
    // // Use this for useMemo
    // document.addEventListener("selectionchange", () => {
    //   debouncedSelectionHandler()
    // })

    // Use this for useCallback
    document.addEventListener("selectionchange", debouncedSelectionHandler())
    
    // Clean up event listners on unmount to prevent unecessary updates or memory leaks
    return () => {
      // // Use this for useMemo
      // document.removeEventListener("selectionchange", () => {
      //   debouncedSelectionHandler()
      // })

      // Use this for useCallback
      document.removeEventListener(
        "selectionchange",
        debouncedSelectionHandler()
      )
    }
  }, [])

  return selection
}
