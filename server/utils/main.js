const { release } = require("os");
const request = require("postman-request");

const similarMovie = function (movieSearch, callback) {
  const apiKey = process.env.apiKey;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieSearch
  )}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    url,
    json: true,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTYwMWU3YmViMDRmYTgzMzQ4MjVlNDExMTVjZjU3MiIsIm5iZiI6MTczNDM4MTA5Mi43ODQsInN1YiI6IjY3NjA4ZTI0YWU4MWEzZTQzNDc4MzY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5n_YU8e0osZwELzr999gMn1xLbxTy9uD8I1H3m1pHw",
    },
  };

  request(options, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to movie server", undefined);
    } else if (body.error || !body.results.length) {
      callback("No movies found. Try another title.", undefined);
    } else {
      callback(undefined, {
        movies: body.results.slice(0, 5).map((m) => ({
          title: m.title,
          releaseDate: m.release_date,
          overview: m.overview,
          poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        })),
      });
    }
  });
};

module.exports = similarMovie;
