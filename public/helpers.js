function shortenURL(bookmark){
  return bookmark.reduce((acc, link) =>
  `${acc} <li class="url-list">
    <a class="link" href="${link.longURL}" target="_blank" data-id=${link.shortenedURL} id=${link.id} data-created=${Date.now()}>
      ${link.shortenedURL.slice(0,3)}.${link.shortenedURL.slice(4,6)}
    </a>
  </li>`, '')
}

module.exports = shortenURL
