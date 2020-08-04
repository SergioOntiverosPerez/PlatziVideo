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
    if(data.data.movie_count > 0){
      return data
    }
    throw new Error('No se encontraron resultados')
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function setAttributes($element, attributes){
    for(const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute])
    }
  }
  const BASE_API = 'https://yts.mx/api/v2/'

  function featuringTemplate(peli) {
    return (
      `<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`
    )
  }

  $form.addEventListener('submit', async (event) => {
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
    const data = new FormData($form)
    try {
      const {
        data: {
          movies: peli
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(peli[0])
      $featuringContainer.innerHTML = HTMLString
    } catch (error) {
        alert(error.message)
        $loader.remove()
        $home.classList.remove('search-active')
    }
    
  })

  // INCLUIR HTML CON JAVASCRIPT  // TEMPLATES
  function videoItemTemplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id=${movie.id} data-category=${category}>
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
      showModal($element)
      
      // const HTMLString = modalTemplate(movie)
      // const movieElements = createTemplate(HTMLString)

    })
    //Jquery
    // $('div').on('click', function(event) {
    //   alert('hola')
    // })
  }
  // HACER DEBUGGER CON UNA ARROW FUNCTION
  function renderMovieList(list, $container, category){
    // actionList.data.movies
    $container.children[0].remove()
    list.forEach( movie => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn')
      })
      addEventClick(movieElement)
      // console.log(HTMLString)
    })
  }

  async function cacheExist(category){
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem(listName)

    if(cacheList){
      return JSON.parse(cacheList)
    }

    const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName, JSON.stringify(data))
    return data
  }
  // const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`)
  const actionList = await cacheExist('action')
  // window.localStorage.setItem('actionList', JSON.stringify(actionList))
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList, $actionContainer, 'action')
  
  const dramaList = await cacheExist('drama')
  // window.localStorage.setItem('dramaList', JSON.stringify(dramaList))
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList, $dramaContainer, 'drama')
  // fetch('https://yts.mx/api/v2/list_movies.json?genre=drama').then( response => {
  //   return response.json() 
  // }).then( listMovies => { dramaList = listMovies.data.movies } ).then(renderMovieList(dramaList, $dramaContainer))

  // console.log('actionList', actionList)

  const animationList = await cacheExist('animation')
  // window.localStorage.setItem('animationList', JSON.stringify(animationList))
  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList, $animationContainer, 'animation')
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

  function findById(list, id){
    return list.find( movie => movie.id === parseInt(id, 10))
  }

  function findMovie(id, category){
    switch(category){
      case 'action': {
        return findById(actionList,id)
      }
      case 'drama': {
        return findById(dramaList,id)
      }
      default: {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id;
    const category = $element.dataset.category
    const data = findMovie(id, category)
    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image)
    $modalDescription.textContent = data.description_full
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
