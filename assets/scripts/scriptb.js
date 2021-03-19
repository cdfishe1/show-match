//variables

const omdbKey = '1c14b455';
const tmdbKey = '94406989928ec2b2df604a84ef1604a1';
const title = document.querySelector('#title');
const year = document.querySelector('#year');
const submitBtn = document.querySelector('#submitBtn');
const submitBtnTmdb = document.querySelector('#submitBtnTmdb');
const refineType = document.querySelector('#refineSearch');
const showType = document.querySelector('#showType');
const results = document.querySelector('#results');
const moviesContainer = document.querySelector('moviesContainer');
const movieSection = document.querySelector('#movies');
const movieCardBoxes = document.querySelector('#movieCardBoxes');

// fetch tmdb config file
const fetchConfig = () => {
  const getTmdbConfig = `https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`;
  fetch(getTmdbConfig)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
})
};

fetchConfig();

//submit button for searh bar
submitBtnTmdb.addEventListener('click', function(event) {
  event.preventDefault();
  let tmdbKeyword = keywordTmdb.value.trim();
  refineType.style.display = 'initial';
  getTmdb(tmdbKeyword);
})

//send value of input bar to the tmdb multi search query and fetch it
const getTmdb = keyword => {
  const tmdbKeyword = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&language=en-US&query=${keyword}&page=1&include_adult=false`;

  fetch(tmdbKeyword)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    let tvResults = [];
    let movieResults = [];

    for (let i = 0; i <= data.results.length - 1; i++) {
      if (data.results[i].media_type === 'movie') {
        movieResults.push(data.results[i]);
      } else if (data.results[i].media_type === 'tv') {
        tvResults.push(data.results[i]);
    } 
    }

    searchMovies(movieResults);
    searchTv(tvResults);

  })

};

//fetch the tv query
const searchTv = tv => {
  for (let i = 0; i <= tv.length - 1; i++) {
    let fetchTv = `https://api.themoviedb.org/3/tv/${tv[i].id}?api_key=${tmdbKey}&language=en-US`;
    fetch(fetchTv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // displayTv(data);
    })
  }
};

//fetch the movies query
const searchMovies = movies => {

  // let moviesForDisplay = []
  for (let i = 0; i <= movies.length - 1; i++) {
    let fetchMovies = `https://api.themoviedb.org/3/movie/${movies[i].id}?api_key=${tmdbKey}&language=en-US`;
    fetch(fetchMovies)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayMovies(data);
      
    })
  }
  
};


//display results of movies to dom
const displayMovies = display => {
  const cardBoxEl = document.createElement('div');
  cardBoxEl.setAttribute('class', 'col-lg-6 col-md-4 col-sm-6');
  const cardArticleEl = document.createElement('article');
  cardArticleEl.setAttribute('class', 'card');
  const cardHeaderEl = document.createElement('header');
  cardHeaderEl.setAttribute('class', 'title-header');
  const divCardBlockEl = document.createElement('div');
  divCardBlockEl.setAttribute('class', 'card-block');
  const imgCardEl = document.createElement('div');
  imgCardEl.setAttribute('class', 'img-card');
  const showImageEl = document.createElement('img');
  showImageEl.setAttribute('src', `https://image.tmdb.org/t/p/w154${display.poster_path}`);
  showImageEl.setAttribute('alt', `${display.title}`);
  // showImageEl.setAttribute('class', 'w-100 custom-size-img');
  showImageEl.style.width = '300px';
  showImageEl.style.height = 'auto';
  const taglineEl = document.createElement('p');
  taglineEl.setAttribute('class', 'tagline card-text text-xs-center');
  const watchNowEl = document.createElement('a');
  watchNowEl.setAttribute('href', '#');
  watchNowEl.setAttribute('class', 'btn btn-primary btn-block');
  const cardIconEl = document.createElement('i');
  cardIconEl.setAttribute('class', 'fa fa-eye');
  
  const titleEl = document.createElement('h3')
  
  // const dateEl = document.createElement('p');
  // const summaryEl = document.createElement('p');

  titleEl.innerHTML = display.title;
  taglineEl.innerHTML = display.overview;

  cardHeaderEl.append(titleEl);
  cardArticleEl.append(cardHeaderEl);
  cardBoxEl.append(cardArticleEl);
  movieCardBoxes.append(cardBoxEl);

  watchNowEl.append(cardIconEl);
  imgCardEl.append(showImageEl);
  divCardBlockEl.append(imgCardEl);
  divCardBlockEl.append(taglineEl);
  divCardBlockEl.append(watchNowEl);

  cardHeaderEl.append(titleEl);
  cardArticleEl.append(cardHeaderEl);
  cardArticleEl.append(divCardBlockEl);

  cardBoxEl.append(cardArticleEl);
  movieCardBoxes.append(cardBoxEl);


  // dateEl.innerHTML = display.release_date;
  // summaryEl.innerHTML = display.overview;

  // results.append(titleEl);
  // results.append(showImageEl);
  // results.append(dateEl);
  // results.append(summaryEl);

    // refineResults(display);

};

//display results of tv shows to dom
const displayTv = display => {
  const titleEl = document.createElement('h2')
  const showImageEl = document.createElement('img');
  showImageEl.setAttribute('src', `https://image.tmdb.org/t/p/w154${display.poster_path}`);
  showImageEl.setAttribute('alt', `${display.name}`);
  const beginDateEl = document.createElement('p');
  const endDateEl = document.createElement('p');
  const summaryEl = document.createElement('p');

  titleEl.innerHTML = display.name;
  beginDateEl.innerHTML = display.first_air_date;
  endDateEl.innerHTML = display.last_air_date;
  summaryEl.innerHTML = display.overview;

  results.append(titleEl);
  results.append(showImageEl);
  results.append(beginDateEl);
  results.append(endDateEl);
  results.append(summaryEl);
};