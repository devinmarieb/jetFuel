const submitBtn = document.querySelector('.submit-btn')
const folderList = document.querySelector('.folders')
const submitBtnUrl = document.querySelector('.right')
let folderName
// <<<<<<< HEAD
// const submitBtnUrl= document.querySelector('.btn-url')
// const urlLink = document.querySelector('.link')
// const counter  = 0
//
// submitBtnUrl.addEventListener('click', (e)=> {
//   e.preventDefault()
//   const urlInput = document.querySelector('.url-input')
//   const server = ('http://localhost:3000/api/urls')
//   fetch(server, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       longURL: urlInput.value
//     })
//   })
//   .then(res => res.json())
//   .then(res => getURLS())
//   urlInput.value = ''
// })
// =======


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
  console.log(folderName);
  const server = (`http://localhost:3000/api/folders/${folderName}/urls`)
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
  .then(res => getFolderURLS())
  urlInput.value = ''
})


folderList.addEventListener('click', (e)=> {
  const id = e.target.dataset.id
  folderName = e.target.innerHTML
  getFolderURLS(id, folderName)
  document.querySelector('.right').innerHTML =
  `<section>
    <aside class="new-url-container">
      <input placeholder="Enter a URL" class="url-input" />
      <input type="submit" value="Shorten" class="submit-btn-url"/>
    </aside>
    <p class="sort-by"> Sort By: </p>
    <button class="popularity-btn">Popularity</button>
    <button class="date-btn">Date Created</button>
  </section>`
})
>>>>>>> master

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

function getFolderURLS(){
  const server = (`http://localhost:3000/api/folders/urls/${folderName}`)
  fetch(server, {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
<<<<<<< HEAD
  .then(res => document.querySelector('.urls').innerHTML)
  .then(res => res.map((url)=> {
    return (`<li>${url.shortenedURL}</li>`)
=======
  .then(res => document.querySelector('.url-container').innerHTML = res.map((url) => {
    return (`<li><a href=${url.longURL} class="url-link">${url.shortenedURL}</a></li>`)
>>>>>>> master
  }))
}
function shortenURL(url){
  return url.reduce((acc, link) => `${acc} <li class="url-list"><a class="link" href="${link.longURL}">${link.id.slice(0,3)}.${link.id.slice(4,6)}</a></li><p>Visited: ${counter} times</p>`, '')
}

window.onload = getFolders()
