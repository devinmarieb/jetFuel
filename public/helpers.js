function shortenURL(bookmark){
  return bookmark.reduce((acc, link) =>
  `${acc} <li class="url-list">
    <a class="link" href="${link.longURL}" target="_blank" data-id=${link.shortenedURL} id=${link.id} data-created=${Date.now()}>
      ${link.shortenedURL.slice(0,3)}.${link.shortenedURL.slice(4,6)}
    </a>
  </li>`, '')
}

function reduceURL(bookmark) {
  return bookmark.reduce((acc, link) =>
  `${acc} <li class="url-list">
    <a class="link" href="${link.longURL}" target="_blank" data-id=${link.shortenedURL} id=${link.id} data-created=${Date.now()}>
      ${link.shortenedURL.slice(0,6)}
    </a>
  </li>`, '')
}

module.exports = {shortenURL, reduceURL}




app.get('/:shortUrl', (request, response) => {
  const { shortUrl } = request.params;
  let longUrl;
  let newCount;

  database('urls').where('shortenedUrl', shortUrl).select()
  .then((urlArray) => {
    longUrl = (urlArray[0].url)
    newCount = (urlArray[0].numOfClicks) + 1
  })
  .then(() => {
    database('urls').where('shortenedUrl', shortUrl).update({ numOfClicks: newCount })
    .then(() => {
      response.status(302).redirect(`${longUrl}`);
    })
  })
  .catch((error) => {
    console.error('error getting short URL:', error)
  })
})
