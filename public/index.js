const submitBtn = document.querySelector('.submit-btn')
const folderList = document.querySelector('.folders')
const submitBtnUrl= document.querySelector('.btn-url')
const urlLink = document.querySelector('.link')
const counter  = 0

submitBtnUrl.addEventListener('click', (e)=> {
  e.preventDefault()
  const urlInput = document.querySelector('.url-input')
  const server = ('http://localhost:3000/api/urls')
  fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      longURL: urlInput.value
    })
  })
  .then(res => res.json())
  .then(res => getURLS())
  urlInput.value = ''
})

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

if(urlLink){//put counter in server side
  urlLink.addEventListener('click', (e) => {
    e.preventDefault()
    this.counter++
  } )
}

function getURLS(){
  const server = ('http://localhost:3000/api/urls')
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => shortenURL(res))
  .then(str => document.querySelector('#urls').innerHTML = str)
}

function shortenURL(url){
  return url.reduce((acc, link) => `${acc} <li class="url-list"><a class="link" href="${link.longURL}">${link.id.slice(0,3)}.${link.id.slice(4,6)}</a></li><p>Visited: ${counter} times</p>`, '')
}

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
  .then(res => document.querySelector('.folders').innerHTML = res.reduce((acc,folder) => `${acc} <ul data-id=${folder.id} class="folder-list">${folder.name}</ul>`,'')
  )
}

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
  .then(res => document.querySelector('.urls').innerHTML)
  .then(res => res.map((url)=> {
    return (`<li>${url.shortenedURL}</li>`)
  }))
  document.querySelector('.right').style = 'display: upset'
})



window.onload = getFolders()
