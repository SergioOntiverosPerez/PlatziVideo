console.log('hola mundo!');

const noChange = "Sergio"

let change = "Sergio Pastor"

function cambiarNombre(nuevoNombre){
  change = nuevoNombre;
}

const getUser = new Promise( (todoBien, todoMal) => {
  // llamar a un api
  setTimeout(function(){
    // luego de tres segundos
    todoMal('Time out')
  }, 3000)  
  
  todoBien('Time ok!')
})

getUser.then( message => {
    console.log(message)
}).catch( message => {
  console.log(message)
})

// jquery
$.ajax( {url: 'https://randomuser.me/api/',
    method: 'GET',
    success: function(data){
        console.log(data)
    },
    error: function (error) {
        console.log(error)
    }
})

// javascript

fetch('https://randomuser.me/api/').then( response => {
  // console.log(response)
  return response.json()
}).then(user => {
  return user.results[0].name.first
}).then(name => {
  console.log(name)
}).catch( err => {
  console.log('algo falló')
});

(async function load(){
  // await
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  
  // INCLUIR HTML CON JAVASCRIPT  // TEMPLATES
  function videoItemTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
              <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
              ${movie.title}
          </h4>
      </div>`
    )
  }
  // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'))

  // HACER DEBUGGER CON UNA ARROW FUNCTION
  actionList.data.movies.forEach( movie => {
    const HTMLString = videoItemTemplate(movie)
    console.log(HTMLString)
  })

  
  let dramaList;
  getData('https://yts.mx/api/v2/list_movies.json?genre=drama').then( data => {
    console.log('dramaList', data)
    dramaList = data
  })
  
  console.log('actionList', actionList)

  let animationList;
  getData('https://yts.mx/api/v2/list_movies.json?genre=animation').then( data => {
    console.log('animationList', data)
    animationList = data
  })

  // // selector con JQuery
  // const $home = $('.home ');

  // // selector Javascript
  // const $newHome = document.getElementById('home')

  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('#drama')
  const $animationContainer = document.getElementById('#animation')

  const $featuringContainer = document.getElementById('#featuring')
  const $form = document.getElementById('#form')
  const $home = document.getElementById('#home')

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  // Incluir html usando jquery
  // '<div class="primaryPlaylistItem">'+
  //   '<div class="primaryPlaylistItem-image">'+
  //     '<img src="src/images/covers/midnight.jpg">'+
  //   '</div>'+
  //     '<h4 class="primaryPlaylistItem-title">'+
  //       'Titulo de la peli'+
  //     '</h4>'+
  // '</div>'

  
  

})() // Los () ejecutan la funcion load
