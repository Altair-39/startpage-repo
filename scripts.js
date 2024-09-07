/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {"id":"RW4FdJdvUgTAzTf7","label":"University","bookmarks":[
      {"id":"zA1AYKtlsYuhN9Uf","label":"GitHub","url":"https://github.com/Luca-Barra"},
      {"id":"Xaz7JxQFZVVDWL5z","label":"Moodle","url":"https://informatica.i-learn.unito.it/"},
      {"id":"lTSwWR6y6D2i1QjV","label":"Department","url":"https://informatica.unito.it/do/home.pl"},
      {"id":"lTSwWR6y6Dsw1Qj1","label":"Master's Degree","url":"https://magistrale.informatica.unito.it/do/home.pl"}
  ]},
  {"id":"LVuCOtZEj9ZJ4W1b","label":"Utility","bookmarks":[
      {"id":"FhFFZRYsXTXqqyE6","label":"Email","url":"https://mail.google.com/mail/u/2/#inbox"},
      {"id":"M5L9IZ70KGnBg4OH","label":"Reddit","url":"https://www.reddit.com/"},
      {"id":"p3YJ2vOLFYatMtE0","label":"Discord","url":"https://discord.com/channels/@me"},
      {"id":"oPokkTOiCakQKlkr","label":"YouTube","url":"https://www.youtube.com"}
  ]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
