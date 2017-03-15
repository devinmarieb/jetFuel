const submitBtn = document.querySelector('.submit-btn')
const folderList = document.querySelector('.folders')
const submitBtnUrl = document.querySelector('.right')


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
  urlInput.value = ''
})

folderList.addEventListener('click', (e)=> {
  const id = e.target.dataset.id
  getFolderURLS(id)
  document.querySelector('.right').innerHTML =
  `<aside>
    <input placeholder="Enter a URL" class="url-input" />
    <input type="submit" value="Shorten" class="submit-btn-url"/>
  </aside>`
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
  }))
}

function getFolderURLS(id){
  const server = (`http://localhost:3000/api/folders/${id}`)
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.url-container').innerHTML = res.map((url) => {
    return (`<li><a href=${url.longURL} class="url-link">${url.shortenedURL}</a></li>`)
  }))
}


window.onload = getFolders()
