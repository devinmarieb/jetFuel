const submitBtn = document.querySelector('.submit-btn')
const folderList = document.querySelector('.folders')
const URLList = document.querySelector('.url-container')
let folderName

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
    </aside>
    <h1 class="folder-title">${e.target.innerHTML}</h1>
  </section>`

  postNewURL()
})

// URLList.addEventListener('click', (e)=> {
//     const id = e.target.id
//     const server = (`/api/urls/${id}`)
//     fetch(server, {
//       method:'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     })
//     .then(res => res.json())
//     .then(res => getFolderURLS(res))
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
  const server = (`/api/folders/${id}/urls`)
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

function shortenURL(bookmark){
  return bookmark.reduce((acc, link) =>
  `${acc} <li class="url-list">
    <a class="link" href="${link.longURL}" target="_blank" data-id=${link.shortenedURL} id=${link.id} data-created=${Date.now()}>
      ${link.shortenedURL.slice(0,3)}.${link.shortenedURL.slice(4,6)}
    </a>
  </li>`, '')
}

function postNewURL() {
    document.querySelector('.submit-btn-url').addEventListener('click', (e)=> {
    e.preventDefault()
    const urlInput = document.querySelector('.url-input')
    const server = (`/api/folders/${folderName}/urls`)
    fetch(server, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        longURL: urlInput.value,
        shortenedURL: urlInput.value,
      })
    })
    .then(res => res.json())
    .then(res => getFolderURLS(folderName))
    urlInput.value = ''
  })
}

window.onload = getFolders()

module.exports = shortenURL
