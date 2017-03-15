const submitBtn = document.querySelector('.submit-btn')
const submitBtnUrl = document.querySelector('.submit-btn-url')
const folderList = document.querySelector('.folders')

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  const userInput = document.querySelector('.user-input')
  const server = ('http://localhost:3000/api/folders')
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

submitBtnUrl.addEventListener('click', (e)=> {
  e.preventDefault()
  const urlInput = document.querySelector('.url-input')
  const server = ('http://localhost:3000/api/urls')
  fetch(server, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      longURL: urlInput.value,
    })
  })
  .then(res => res.json())
  .then(res => getURLs())
  urlInput.value = ''
})

function getFolders(){
  const server = ('http://localhost:3000/api/folders')
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.folders').innerHTML = res.map((folder) => {
    return (`<ul data-id=${folder.id} class="folder-list">${folder.name}</ul>`)
  })
)}

function getURLs(){
  const server = ('http://localhost:3000/api/urls')
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.urls').innerHTML = res.map((url) => {
    return (`<li><a href=${url.longURL}>${url.longURL}</a></li>`)
  })
)}

folderList.addEventListener('click', (e)=> {
  const id = e.target.dataset.id
  const server = (`http://localhost:3000/api/folders/${id}`)
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.urls').innerHTML = res.map((url)=> {
    return (`<li><a href=${url.longURL}>${url.shortenedURL}</a></li>`)
  }))
  document.querySelector('.right').style = 'display: upset'
})



window.onload = getFolders()
