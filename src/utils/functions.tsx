import type { ISelection } from "~hooks/useSelection"

export const getSelection = (): ISelection => {
  const selection = window.getSelection()

  if (!selection || selection.isCollapsed || selection.rangeCount === 0)
    return { rects: [], selectedText: null }

  return {
    rects: Array.from(selection.getRangeAt(0).getClientRects()),
    selectedText: selection.getRangeAt(0).toString()
  }
}

export const tldLocales = {
  "com.au": "Australia",
  "com.br": "Brazil",
  ca: "Canada",
  cn: "China",
  fr: "France",
  it: "Italy",
  "co.in": "India",
  "co.jp": "Japan",
  "com.ms": "Mexico",
  ru: "Russia",
  "co.za": "South Africa",
  "co.uk": "United Kingdom"
}
