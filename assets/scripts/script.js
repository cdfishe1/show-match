const omdbKey = '1c14b455';

const getOmdb = () => {
    const getOmdbApi = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}`;

    fetch(getOmdbApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
};

getOmdb();