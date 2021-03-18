const omdbKey = '1c14b455';
const tmdbKey = '94406989928ec2b2df604a84ef1604a1';
const title = document.querySelector('#title');
const year = document.querySelector('#year');
const submitBtn = document.querySelector('#submitBtn');
const submitBtnTmdb = document.querySelector('#submitBtnTmdb');
const showType = document.querySelector('#showType');
const results = document.querySelector('#results');

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

submitBtnTmdb.addEventListener('click', function(event) {
  event.preventDefault();
  let tmdbKeyword = keywordTmdb.value.trim();
  getTmdb(tmdbKeyword);
})

const getTmdb = (keyword) => {
  const getTmdbConfig = `https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`;
  const tmdbKeyword = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&language=en-US&query=${keyword}&page=1&include_adult=false`;

  fetch(getTmdbConfig)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })

  fetch(tmdbKeyword)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    for (let i = 0; i <= data.results.length; i++) {
      const titleEl = document.createElement('h2')
      const showImageEl = document.createElement('img');
      showImageEl.setAttribute('src', `https://image.tmdb.org/t/p/w154${data.results[i].poster_path}`);
      showImageEl.setAttribute('alt', `${data.results[i].title}`);
      const dateEl = document.createElement('p');
      const summaryEl = document.createElement('p');
  
      titleEl.innerHTML = data.results[i].title;
      dateEl.innerHTML = data.results[i].release_date;
      summaryEl.innerHTML = data.results[i].overview;
  
      results.append(titleEl);
      results.append(showImageEl);
      results.append(dateEl);
      results.append(summaryEl);
    }

  
});
};

// getTmdb();