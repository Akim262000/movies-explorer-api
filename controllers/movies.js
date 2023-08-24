const movie = require("../models/movie");
const Movie = require("../models/movie");
const { ERROR_CREATE } = require("../utils/utils");

const getCurrentUserMovies = (req, res) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies.map((movie) => movie));
    })
    .catch(next);
};

const createMovie = (req, res) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(ERROR_CREATE).send(movie))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ErrorConflict("Данный фильм уже в избранном"));
      }
      return next(err);
    });
};

const deleteMovie = (req, res) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound("Карточка не найдена"));
      }

      if (!movie.owner.equals(_id)) {
        return next(new ErrorForbidden("Нельзя удалить!"));
      }

      Movie.findByIdAndRemove(cardId).then(res.status(ERROR_OK).send(movie));
    })
    .catch(next);
};

module.exports = {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
};
