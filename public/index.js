const submitBtnFolder = document.querySelector('.submit-btn-folder')
const folderList = document.querySelector('.folders')
const bookmark = document.querySelector('.link')
let folderName
let urlid


submitBtnFolder.addEventListener('click', (e)=> {
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


  document.querySelector('.submit-btn-url').addEventListener('click', (e)=> {
    console.log('fired');
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
        date: Date.now(),
        counter: 0
      })
    })
    .then(res => res.json())
    .then(res => getFolderURLS())
    urlInput.value = ''
  })

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
  .then(res => document.querySelector('.url-container').innerHTML = shortenURL(res))
}

http://localhost:3000/api/folders/foo/urls


http://gabi.com/thqiuf


<a href="http://localhost:3000/api/urls/thquif">Link</a>
http://google.com/?searchTerms=amazon+shopping+list+books+new+releases


function shortenURL(bookmark){
  return bookmark.reduce((acc, link) => `${acc} <li class="url-list"><a class="link" target="_blank"  href="${link.shortenedURL}">${link.shortenedURL.slice(0,3)}.${link.shortenedURL.slice(4,6)}</a></li><p>Counter: ${link.counter}, Date: ${link.date}`, '')
}

window.onload = getFolders()
