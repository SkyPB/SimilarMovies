const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cors = require("cors");
const similarMovie = require("./utils/main");

const app = express();

app.use(
  cors({
    origin: "https://https://similarmovies.onrender.com/",
  })
);

const port = process.env.PORT || 3000;

// Define paths for Express configuration
const clientDirPath = path.join(__dirname, "../client");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(clientDirPath));

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.render("index", {
    title: "Cinema Compass",
    name: "Sky Patterson-Baker",
  });
});

app.get("/movies", (req, res) => {
  const movie = req.query.movie_search;
  res.json({ message: "CORS enabled!" });
  if (!movie) {
    return res.send({
      error: "You must provide a movie title",
    });
  }

  similarMovie(movie, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sky Patterson-Baker",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
