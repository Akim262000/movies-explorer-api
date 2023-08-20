const Movie = require("../models/movie");

const getUserMovies = (req, res) => {
  Movie.find({ owner: req.user._id })
  .then((movies) => {
    res.send(movies.map((movie) => movie));
  })
  .catch((err) => errorsHandler(err, res));
}

const createMovie = (req, res) => {

};

const deleteMovie = (req, res) => {

};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};