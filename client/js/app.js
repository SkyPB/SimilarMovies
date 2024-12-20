const movieForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const movie = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  results.innerHTML = "";

  fetch(
    `http://localhost:3000/movies?movie_search=${encodeURIComponent(movie)}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Here are some similar movies:";
        data.movies.forEach((movie) => {
          const card = document.createElement("div");
          card.className = "movie-card";

          const img = document.createElement("img");
          img.src = movie.poster;
          img.alt = movie.title;

          const title = document.createElement("h3");
          title.textContent = movie.title;

          const releaseDate = document.createElement("p");
          releaseDate.textContent = `Release Date: ${movie.releaseDate}`;

          const overview = document.createElement("p");
          overview.textContent = movie.overview;

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(releaseDate);
          card.appendChild(overview);

          results.appendChild(card);
        });
      }
    });
  });
});
