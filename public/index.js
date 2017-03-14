const inputField = document.querySelector('.user-input')
const submitBtn = document.querySelector('.submit-btn')

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  const userInput = document.querySelector('.user-input')
  //on button click make post request with user input value
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
    return (`<ul>${folder.name}</ul>`)
  })
)}


window.onload = getFolders()
