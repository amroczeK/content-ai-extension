import { tldLocales } from "~utils/functions"

chrome.runtime.onInstalled.addListener(async () => {
  for (let [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: locale,
      type: "normal",
      contexts: ["selection"]
    })
  }
})

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
  const tld = item.menuItemId
  const url = new URL(`https://google.${tld}/search`)
  url.searchParams.set("q", item.selectionText)
  chrome.tabs.create({ url: url.href, index: tab.index + 1 })
})
