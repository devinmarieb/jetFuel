const submitBtn = document.querySelector('.submit-btn')
const folderList = document.querySelector('.folders')
const URLList = document.querySelector('.url-container')
let folderName
let finalURL

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  const userInput = document.querySelector('.user-input')
  const server = ('/api/folders')
  fetch(server, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: userInput.value,
    })
  })
  .then(res => res.json())
  .then(res => getFolders())
  userInput.value = ''
})

folderList.addEventListener('click', (e)=> {
  const id = e.target.dataset.id
  folderName = e.target.dataset.id
  getFolderURLS(id, folderName)
  document.querySelector('.right').innerHTML =
  `<section>
    <aside class="new-url-container">
      <input placeholder="Enter a URL" class="url-input" />
      <input type="submit" value="Shorten" class="submit-btn-url"/>
      <aside class="sort-container">
        <p class="sort-by">Sort By:</p>
        <button class="date-btn">Most Recent</button>
        <button class="popularity-btn">Popularity</button>
      </aside>
    </aside>
    <h1 class="folder-title">${e.target.innerHTML}</h1>
  </section>`

  postNewURL()
  sortByDate()
  sortByPopularity()
})

// URLList.addEventListener('click', (e)=> {
//     const shortURL = e.target.shortURL
//     const server = (`/${shortURL}`)
//     fetch(server, {
//       method:'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     })
//     .then(res => res.json())
// })



function getFolders(){
  const server = ('/api/folders')
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.folders').innerHTML = res.reduce((acc,folder) => `${acc} <ul data-id=${folder.id} class="folder-list">${folder.name}</ul>`,'')
  )
}

function getFolderURLS(id){
  const server = (`http://localhost:3000/api/folders/${id}/urls`)
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.url-container').innerHTML = shortenURL(res))
}

function shortenURL(bookmark) {
  return bookmark.reduce((acc, link) =>
  `${acc} <li class="url-list">
    <a class="link" href="${link.longURL}" target="_blank" data-id=${link.shortenedURL} id=${link.id} data-created=${Date.now()}>
      ${link.shortenedURL.slice(0,6)}
    </a>
    <p class="url-clicks">visit count: ${link.clicks}</p>
    <p class="url-date">date created: </p>
  </li>`, '')
}

function postNewURL() {
    document.querySelector('.submit-btn-url').addEventListener('click', (e)=> {
      debugger
    e.preventDefault()
    const urlInput = document.querySelector('.url-input').value
    const emptyInput = document.querySelector('.url-input')
    checkURL(urlInput)
    const server = (`/api/folders/${folderName}/urls`)
    fetch(server, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        longURL: finalURL
      })
    })
    .then(res => res.json())
    .then(res => getFolderURLS(folderName))
    emptyInput.value = ''
  })
}

function checkURL(urlInput) {
  if(urlInput.slice(0,7) === "http://" || urlInput.slice(0,8) === "https://") {
    finalURL = urlInput
  } else {
    finalURL = 'http://'.concat(urlInput)
  }
}

function sortByDate() {
  document.querySelector('.date-btn').addEventListener('click', (e)=> {
    console.log('date button');
  })
}

function sortByPopularity() {
  document.querySelector('.popularity-btn').addEventListener('click', (e)=> {
    console.log('popularity button');
  })
}

window.onload = getFolders()

module.exports = {shortenURL, reduceURL}
