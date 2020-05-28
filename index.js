(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const listGenres = document.getElementById('list-genres')
  //建立側欄表單
  let types = Object.values(genres)
  let list = ''
  types.forEach((type) => {
    list += `<a class="list-group-item list-group-item-action" data-toggle="list" href="#list-home" role="tab">${type}</a>`
    listGenres.innerHTML = list
  })

  $('#list-genres a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
  //點擊滑鼠顯示清單
  
  listGenres.addEventListener('click', function (event) {
    let movieSplitData = []
    const genresName = event.target.innerText
    console.log(genresName)
    movieGenres.forEach(function (item) {
      console.log(item)
      if (item.includes(genresName)) {
        console.log(movieGenres.indexOf(item))
        let index = movieGenres.indexOf(item)
        console.log(data[index])
        movieSplitData.push(data[index])
      }
    })
    displayDataList(movieSplitData)
  })

  const dataPanel = document.getElementById('data-panel')

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    genresInterval(data)
    displayDataList(data)
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    }
  })

  function displayDataList(data) {
    let htmlContent = ''
    
    data.forEach(function (item, index) {
      let genresInfo = item.genres
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>

            <!-- "More" button -->
            <div class="card-footer">
      `
            genresInfo.forEach(function (index) {
              htmlContent +=`
              <span class="badge badge-light" id="genres-footer">${genres[index]}</span>
              `
            })

      htmlContent +=`       
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  // set search 
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')

  // listen to search form submit event
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    // console.log('click!')
    let input = searchInput.value.toLowerCase()
    let results = data.filter(
      movie => movie.title.toLowerCase().includes(input)
    )
    // console.log(results)
    // displayDataList(results)
  })

  let movieGenres = []

  function genresInterval(data) {
    data.forEach(function (item, index) {
      let genresInfo = item.genres
      let array = []
      genresInfo.forEach(function (index) {
        // console.log(genres[index])
        array.push(genres[index])
      })
      movieGenres.push(array)
    })
    // console.log(movieGenres)
  }
})()