import debounce from "lodash.debounce"
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

//import { getSelection } from "../utils/functions"

export const getSelection = (): ISelection => {
  const selection = window.getSelection()

  if (!selection || selection.isCollapsed || selection.rangeCount === 0)
    return { selection: null, rects: [], selectedText: null }

  return {
    selection: selection.getRangeAt(0),
    rects: Array.from(selection.getRangeAt(0).getClientRects()),
    selectedText: selection.getRangeAt(0).toString()
  }
}

export interface ISelection {
  selection: Range | null
  rects: DOMRect[] | []
  selectedText: string | null
}

export const useSelection = (
  ref: MutableRefObject<HTMLDivElement>
): ISelection => {
  const [selection, setSelection] = useState<ISelection>({
    selection: null,
    rects: [],
    selectedText: null
  })

  const selectionHandler = useCallback(() => {
    const plasmoCsui = document.querySelector("plasmo-csui")
    if (plasmoCsui) {
      const plasmoShadowContainer = plasmoCsui.shadowRoot.getElementById(
        "plasmo-shadow-container"
      )
      if (plasmoShadowContainer) {
        const plasmoOverlay0 =
          plasmoShadowContainer.querySelector("#plasmo-overlay-0")
        if (
          plasmoOverlay0 &&
          !ref.current &&
          !plasmoOverlay0.contains(ref.current)
        ) {
          setSelection(getSelection())
        }
      }
    }
  }, [setSelection, ref])

  const debouncedSelectionHandler = useMemo(
    () => debounce(selectionHandler, 750),
    [selectionHandler]
  )

  useEffect(() => {
    document.addEventListener("selectionchange", debouncedSelectionHandler)

    // Clean up event listners on unmount to prevent unecessary updates or memory leaks
    return () => {
      document.removeEventListener("selectionchange", debouncedSelectionHandler)
    }
  }, [])

  return selection
}
