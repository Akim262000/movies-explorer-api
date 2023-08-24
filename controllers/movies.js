const { error } = require("winston");
const ErrorBadRequest = require("../errors/ErrorBadRequest");
const Movie = require("../models/movie");
const { ERROR_CREATE } = require("../utils/utils");

const getCurrentUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies.map((movie) => movie));
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        return next(
          new ErrorBadRequest("Некоректные данные для создания фильма")
        );
      }
      if (err.code === 11000) {
        return next(new ErrorConflict("Данный фильм уже в избранном"));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound("Фильм не найдена"));
      }

      if (!movie.owner.equals(_id)) {
        return next(new ErrorForbidden("Нельзя удалить!"));
      }

      return movie
        .remove()
        .then(() => res.send({ message: "Фильм удален из избранного" }));
    })

    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new ErrorBadRequest("Неверный формат ID"));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
};
