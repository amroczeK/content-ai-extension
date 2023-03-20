import debounce from "lodash.debounce"
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

import { getSelection } from "../utils/functions"

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

  /**
   *  The seleionchange event listener is called when textarea is focused, resetting
   *  the selection as nothing selected, causing the rendered extension to disappear.
   *
   *  Call setSelection only if the extension component isn't rendered, preventing the
   *  selection attributes from being reset and causing the component to disappear to user.
   *
   *  This is an alternative to using event.preventDefault on child elements, alternatively
   *  it would be better to add another event listener for click events in conjunction with
   *  ref.current.contains(event.target) and prevent the selectionchange event listener from
   *  firing. But during implementation of this solution I ran into issues with plasmo-overlay
   *  in the shadow dom unexpectidely not having the current ref as a child element.
   *
   *  So this solution will have to do with the current user flow until I come up with a better solution.
   * 
   *  TODO: Figure out why event.target didn't have expected current ref element as child.
   */
  const selectionHandler = useCallback(() => {
    if (ref?.current?.id !== "content-container") setSelection(getSelection())
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
  }, [debouncedSelectionHandler])

  return selection
}
