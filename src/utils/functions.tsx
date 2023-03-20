import type { ISelection } from "~hooks/useSelection"

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