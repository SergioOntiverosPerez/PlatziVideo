// console.log('hola mundo!');

// const noChange = "Sergio"

// let change = "Sergio Pastor"

// function cambiarNombre(nuevoNombre){
//   change = nuevoNombre;
// }

// const getUser = new Promise( (todoBien, todoMal) => {
//   // llamar a un api
//   setTimeout(function(){
//     // luego de tres segundos
//     todoMal('Time out')
//   }, 3000)  
  
//   todoBien('Time ok!')
// })

// getUser.then( message => {
//     console.log(message)
// }).catch( message => {
//   console.log(message)
// })

// // jquery
// $.ajax( {url: 'https://randomuser.me/api/',
//     method: 'GET',
//     success: function(data){
//         console.log(data)
//     },
//     error: function (error) {
//         console.log(error)
//     }
// })

// // javascript

// fetch('https://randomuser.me/api/').then( response => {
//   // console.log(response)
//   return response.json()
// }).then(user => {
//   return user.results[0].name.first
// }).then(name => {
//   console.log(name)
// }).catch( err => {
//   console.log('algo falló')
// });

(async function load(){
  // await
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function setAttributes($element, attributes){
    for(const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  $form.addEventListener('submit', (event) => {
    // debugger
    event.preventDefault() // para evitar que recargue
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
  })
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')


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

  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    return html.body.children[0]
  }
  // declaro el container
  

  function addEventClick($element){
    $element.addEventListener('click', () => {
      showModal()
      
      // const HTMLString = modalTemplate(movie)
      // const movieElements = createTemplate(HTMLString)

    })
    //Jquery
    // $('div').on('click', function(event) {
    //   alert('hola')
    // })
  }

  // HACER DEBUGGER CON UNA ARROW FUNCTION
  function renderMovieList(list, $container){
    // actionList.data.movies
    $container.children[0].remove()
    list.forEach( movie => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      addEventClick(movieElement)
      // console.log(HTMLString)
    })
  }
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList.data.movies, $actionContainer)
  
  
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList.data.movies, $dramaContainer)
  // fetch('https://yts.mx/api/v2/list_movies.json?genre=drama').then( response => {
  //   return response.json() 
  // }).then( listMovies => { dramaList = listMovies.data.movies } ).then(renderMovieList(dramaList, $dramaContainer))

  // console.log('actionList', actionList)

  
  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList.data.movies, $animationContainer)
  // fetch('https://yts.mx/api/v2/list_movies.json?genre=animation').then( data => {
  //   return data.json()
  // }).then( listMovies => { animationList = listMovies.data.movies } ).then( renderMovieList(animationList, $animationContainer) )
  // // selector con JQuery
  // const $home = $('.home ');

  // // selector Javascript
  // const $newHome = document.getElementById('home')

  
  
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  function showModal() {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }
  $hideModal.addEventListener('click', () => {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  })
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
